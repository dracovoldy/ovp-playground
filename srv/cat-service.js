const cds = require('@sap/cds');
const alasql = require('alasql');
const arq    = require('arquero');

const dateJSONToEDM = jsonDate => {
    const content = /\d+/.exec(String(jsonDate));
    const timestamp = content ? Number(content[0]) : 0;
    const date = new Date(timestamp);
    const string = date.toISOString();
    return string;
};

const iWeekNo    = sDate => {
    let oDate    = new Date(sDate),
        oJan1    = new Date(oDate.getFullYear(), 0, 1),
        iWeekNo  = Math.ceil((((oDate - oJan1) / 86400000) + oJan1.getDay() + 1) / 7);
    return iWeekNo.toString();
};

module.exports = cds.service.impl(async (srv) => {
    const API_MAINTENANCEORDER = await cds.connect.to('API_MAINTENANCEORDER');
    const ZZ1_CALENDARDATE_CDS = await cds.connect.to('ZZ1_CALENDARDATE_CDS');
    const ZZ1_SYSTEMUSERCHANGEDOCS_CDS = await cds.connect.to('ZZ1_SYSTEMUSERCHANGEDOCS_CDS');

    const { MaintenanceOrderAnalytics, MaintenanceOrderCompleteAnalytics, MaintenanceOrderAgeAnalytics } = srv.entities;

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
    srv.on(['READ'], MaintenanceOrderCompleteAnalytics, async (req) => {

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
                // req_caldate = await ZZ1_CALENDARDATE_CDS.tx(req).get(`/ZZ1_CALENDARDATE?$filter=CalendarDate eq datetime'${order.LatestAcceptableCompletionDate + 'T00:00:00'}'`);

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

                // order.CalendarYear = req_caldate[0].CalendarYear;
                // order.CalendarMonth = req_caldate[0].CalendarMonth;
                // order.CompletionDateDim = req_caldate[0].CalendarMonth + " " + req_caldate[0].CalendarYear;

                let aDate   = order.LatestAcceptableCompletionDate.split('-'),
                    sWeekNo = iWeekNo(order.LatestAcceptableCompletionDate);
                order.CalendarYear = aDate[0];
                order.CalendarMonth = aDate[1];
                order.CompletionDateDim = "W " + sWeekNo + " Y " + aDate[0];                
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

    // Join with I_SystemUserChangeDocs to calculate Age Dimension Bucket
    srv.on(['READ'], MaintenanceOrderAgeAnalytics, async (req) => {

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
        } 
        /*
        else {
            query.where([
                ...xpr,
            ]);
        }
        */

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

        let orders_tab = arq.from(res_orders);

        let res_docs = await ZZ1_SYSTEMUSERCHANGEDOCS_CDS.tx(req).run({ // limit this - there are more than 35,000 records - 5 second download.
            SELECT: { from: { ref: ["ZZ1_SYSTEMUSERCHANGEDOCS_CDS.ZZ1_SystemUserChangeDocs"] } } 
        });

        let docs_tab = arq.from(res_docs),
            join = orders_tab.join_left(docs_tab, ['MaintenanceOrderInternalID', 'ApplicationStatusObject']),
            output = join.objects();

        return [
            {}, {}, {}
        ];
        
    });

});



