const cds = require('@sap/cds');
const alasql = require('alasql');

// const queryExternal = async (result, count) => {
//     return result;
// }

module.exports = cds.service.impl(async (srv) => {
    const API_MAINTENANCEORDER = await cds.connect.to('API_MAINTENANCEORDER');

    const { MaintenanceOrderAnalytics } = srv.entities;

    srv.on(['READ'], MaintenanceOrderAnalytics, async (req) => {

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

        // if (filteredGroupBy && filteredGroupBy.length > 0) {
        //     query.orderBy([{ ref: filteredGroupBy[0].ref, sort: 'asc' }])
        // }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API ODATA V2 in CSN.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        // console.log(query)
        let results = await API_MAINTENANCEORDER.tx(req).send({
            query: query,
        });

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

});



