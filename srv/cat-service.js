const cds = require('@sap/cds');
const alasql = require('alasql');

const dateJSONToEDM = jsonDate => {
    const content = /\d+/.exec(String(jsonDate));
    const timestamp = content ? Number(content[0]) : 0;
    const date = new Date(timestamp);
    const string = date.toISOString();
    return string;
};

// class catalogservice extends cds.ApplicationService {
//     async init() {
//         const { MaintenanceOrderAnalytics } = this.entities;
//         // const API_MAINTENANCEORDER = await cds.connect.to('API_MAINTENANCEORDER');
//         this.on('READ', MaintenanceOrderAnalytics, async (req) => {
//             // let result = await API_MAINTENANCEORDER.tx(req).run({SELECT: { from: { ref: ["API_MAINTENANCEORDER.MaintenanceOrder"] } } });
//             if (req.query.SELECT.columns[0].func === 'sum') {
//                 req.query.SELECT.columns[0].as = "Counter"; // silly attempt to overwrite alias "CounterAggregate"
//                 let result = [ // Test Data to render an analytical card
//                     { "MaintOrdProcessPhaseCode": "AB", "MaintenanceOrderType": "YA04", "Counter": 2 },
//                     { "MaintOrdProcessPhaseCode": "AB", "MaintenanceOrderType": "YB01", "Counter": 4 },
//                     { "MaintOrdProcessPhaseCode": "AC", "MaintenanceOrderType": "YA02", "Counter": 1 },
//                     { "MaintOrdProcessPhaseCode": "AD", "MaintenanceOrderType": "YB01", "Counter": 2 }
//                 ];

//                 console.log(result)
//                 return result;
//             }
//         });
//         return super.init();
//     }
// }
// module.exports = { catalogservice };

module.exports = cds.service.impl(async (srv) => {
    const API_MAINTENANCEORDER = await cds.connect.to('API_MAINTENANCEORDER');
    const ZZ1_CALENDARDATE_CDS = await cds.connect.to('ZZ1_CALENDARDATE_CDS');

    const { MaintenanceOrderAnalytics, MaintenanceOrderAgeAnalytics } = srv.entities;

    srv.on(['READ'], MaintenanceOrderAnalytics, async (req) => {

        let query = SELECT.from(req.query.SELECT.from)
            .columns(req.query.SELECT.columns)
            .limit(req.query.SELECT.limit);

        if (req.query.SELECT.where) {

            query.where(req.query.SELECT.where);

            //     query.where([
            //         ...internalFilters,
            //         'and',
            //         ...req.query.SELECT.where
            //     ]);
            // } else {
            //     query.where([
            //         ...internalFilters,
            //     ]);

        }

        if (req.query.SELECT.orderBy) {
            query.orderBy(req.query.SELECT.orderBy)
        }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API ODATA V2 in CSN.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        // console.log(query)
        let results = await API_MAINTENANCEORDER.tx(req).send({
            query: query,
        });
        // console.log(results);

        let finalRes = await Promise.all(results);
        // console.log(req.query.SELECT);
        if (req.query.SELECT.groupBy) {
            let result = [];
            let cond = req.query.SELECT.groupBy.filter(col => col.ref ? true : false)
                .map(col => {
                    return col.ref[0];
                }).join();

            result = alasql('SELECT COUNT(*) AS __AGGREGATION__Counter,' + cond + ' FROM ? GROUP BY ' + cond + ' ORDER BY ' + cond, [finalRes]);
            // console.log(result);

            return result;
        }

        if (req.query.SELECT.count) {
            finalRes['$count'] = finalRes.length
        }

        return finalRes;
    });


    // Join with I_CalendarDate to calculate Completed By Date Dimension Bucket
    srv.on(['READ'], MaintenanceOrderAgeAnalytics, async (req) => {

        // let internalFilters = [{ LatestAcceptableCompletionDate: { '!=': null } }]

        let { xpr } = cds.parse.expr(`LatestAcceptableCompletionDate != null and (MaintenanceOrderType = 'YA01' or MaintenanceOrderType = 'YA02' or MaintenanceOrderType = 'YA03' or MaintenanceOrderType = 'YA04')`)

        let query = SELECT.from(req.query.SELECT.from)
            // .columns(req.query.SELECT.columns)
            .limit(req.query.SELECT.limit);

        if (req.query.SELECT.where) {
            // query.where(req.query.SELECT.where);

            query.where([
                ...xpr,
                'and',
                ...req.query.SELECT.where
            ]);
        } else {
            query.where([
                ...xpr,
            ]);
        }

        if (req.query.SELECT.orderBy) {
            query.orderBy(req.query.SELECT.orderBy)
        }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API ODATA V2 in CSN.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        // Get all maintenance orders
        let res_orders = await API_MAINTENANCEORDER.tx(req).send({
            query: query,
        });

        // console.log(res_orders)

        // Get all? limited number of calendar dates
        let res_orders_and_dates = res_orders.map(async order => {
            if (order.LatestAcceptableCompletionDate) {
                // let lacd = dateJSONToEDM(order.LatestAcceptableCompletionDate);
                req_caldate = await ZZ1_CALENDARDATE_CDS.tx(req).get(`/ZZ1_CALENDARDATE?$filter=CalendarDate eq datetime'${order.LatestAcceptableCompletionDate + 'T00:00:00'}'`);

                /* 
                "CalendarDate" : "\/Date(1638489600000)\/",
                "CalendarYear" : "2021",
                "CalendarQuarter" : "4",
                "CalendarMonth" : "12",
                "CalendarWeek" : "48",
                "CalendarDay" : "03",
                "YearMonth" : "202112",
                "YearQuarter" : "20214",
                "YearWeek" : "202148",
                "WeekDay" : "5",
                "FirstDayOfWeekDate" : "\/Date(1638144000000)\/",
                "FirstDayOfMonthDate" : "\/Date(1638316800000)\/",
                "CalendarDayOfYear" : "337",
                "YearDay" : "2021337"
                */

                order.CalendarYear = req_caldate[0].CalendarYear;
                order.CalendarMonth = req_caldate[0].CalendarMonth;
                order.CompletionDateDim = req_caldate[0].CalendarMonth + " " + req_caldate[0].CalendarYear;
            }

            return order;
        });

        res_orders_and_dates = await Promise.all(res_orders_and_dates);

        // console.log(req.query.SELECT);
        if (req.query.SELECT.groupBy) {
            let result = [];
            let cond = req.query.SELECT.groupBy.filter(col => col.ref ? true : false)
                .map(col => {
                    return col.ref[0];
                }).join();

            result = alasql('SELECT COUNT(*) AS __AGGREGATION__Counter,' + cond + ' FROM ? GROUP BY ' + cond + ' ORDER BY ' + cond, [res_orders_and_dates]);
            // console.log(result);

            return result;
        }

        // if (req.query.SELECT.count) {
        //     res_orders_and_dates['$count'] = res_orders_and_dates.length
        // }

        return res_orders_and_dates;
    });

    // srv.on(['READ'], WorkOrderFilters, async (req) => {
    //     return API_MAINTENANCEORDER.tx(req).run(req.query);
    // });

    // srv.on(['READ'], C_MaintOrderTypeVH, async (req) => {
    //     return API_MAINTENANCEORDER.tx(req).run(req.query);
    // });

    // srv.on(['READ'], I_PMNotificationPriority, async (req) => {
    //     return API_MAINTENANCEORDER.tx(req).run(req.query);
    // });

});



