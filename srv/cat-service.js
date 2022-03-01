const cds = require('@sap/cds');
const alasql = require('alasql');

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

    const { MaintenanceOrderAnalytics } = srv.entities;

    srv.on(['READ'], MaintenanceOrderAnalytics, async (req) => {
<<<<<<< HEAD

        // let sMeasureParam = 'Counter';
        // let filteredGroupBy = req.query.SELECT.groupBy ? req.query.SELECT.groupBy.filter(item => {
        //     if (item.ref[sMeasureParam]) {
        //         return false;
        //     }
        //     return true;
        // }) : null;

        // Report 2: Work Orders awaiting information outside Maintenance group
        // let internalFilters = [
        //     { ref: ['MaintOrdProcessSubPhaseCode'] }, '=', { val: '0035' }, 'and',
        //     { ref: ['ConcatenatedOrderPhaseCtrlText'] }, '=', { val: 'H001' },
        // ];
=======
>>>>>>> 4963d3c92a146789c96efd2bb7c2af93df0daac0

        let query = SELECT.from(req.query.SELECT.from)
            .columns(req.query.SELECT.columns)
            .limit(req.query.SELECT.limit);

        if (req.query.SELECT.where) {
<<<<<<< HEAD

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

=======
            query.where([
                ...req.query.SELECT.where
            ]);
>>>>>>> 4963d3c92a146789c96efd2bb7c2af93df0daac0
        }

        if (req.query.SELECT.orderBy) {
            query.orderBy(req.query.SELECT.orderBy)
        }

        if (req.query.SELECT.groupBy) {
<<<<<<< HEAD
            // Ignore GroupBy as it is not supported by API ODATA V2 in CSN.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        // console.log(query)
=======
            // Ignore GroupBy as it is not supported by API ODATA V2.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        console.log(req.query);
>>>>>>> 4963d3c92a146789c96efd2bb7c2af93df0daac0
        let results = await API_MAINTENANCEORDER.tx(req).send({
            query: query,
        });
        console.log(results);
        return results;

<<<<<<< HEAD
        let finalRes = await Promise.all(results);
        console.log(req.query.SELECT);
        if (req.query.SELECT.groupBy) {
            let result = [];
            let cond = req.query.SELECT.groupBy.filter(col => col.ref ? true : false)
                .map(col => {
                    return col.ref[0];
                }).join();

            result = alasql('SELECT COUNT(*) AS __AGGREGATION__Counter,' + cond + ' FROM ? GROUP BY ' + cond + ' ORDER BY ' + cond, [finalRes]);
            console.log(result);

            return result;
        }

        if (req.query.SELECT.count) {
            finalRes['$count'] = finalRes.length
        }

        return finalRes;
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
=======
        // let finalRes = await Promise.all(results);
        // return finalRes;

        // if (req.query.SELECT.groupBy) {
        //     let result = [];
        //     let cond = req.query.SELECT.columns.map(col => {
        //         return col.ref[0];
        //     }).join();

        //     result = alasql('SELECT COUNT(*) AS InternalCount,' + cond + ' FROM ? GROUP BY ' + cond + ' ORDER BY ' + cond, [finalRes]);
        //     result = result.map(item => {
        //         item.Counter = item.InternalCount;
        //         delete item.InternalCount;
        //         return item;
        //     });

        //     // console.log(result);

        //     return result;
        // }

        // if (req.query.SELECT.count) {
        //     finalRes['$count'] = finalRes.length
        // }

        // // console.log(results.length);

        // return finalRes;

    });
>>>>>>> 4963d3c92a146789c96efd2bb7c2af93df0daac0

});



