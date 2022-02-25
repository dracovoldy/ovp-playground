const cds = require('@sap/cds');
const alasql = require('alasql');

// const queryExternal = async (result, count) => {
//     return result;
// }

module.exports = cds.service.impl(async (srv) => {
    const API_MAINTENANCEORDER = await cds.connect.to('EAM_OBJPG_MAINTENANCEORDER_SRV');

    const { WorkOrderAnalytics1, WorkOrderFilters, C_MaintOrderTypeVH, I_PMNotificationPriority } = srv.entities;

    srv.on(['READ'], WorkOrderAnalytics1, async (req) => {

        // let sMeasureParam = 'CountNum';
        // let filteredGroupBy = req.query.SELECT.groupBy ? req.query.SELECT.groupBy.filter(item => {
        //     if (item.ref[sMeasureParam]) {
        //         return false;
        //     }
        //     return true;
        // }) : null;

        // Report 2: Work Orders awaiting information outside Maintenance group
        let internalFilters = [
            { ref: ['MaintOrdProcessSubPhaseCode'] }, '=', { val: '0035' }, 'and',
            { ref: ['ConcatenatedOrderPhaseCtrlText'] }, '=', { val: 'H001' },
        ];

        console.log(req.query);

        let query = SELECT.from(req.query.SELECT.from)
            .columns(req.query.SELECT.columns)
            .limit(req.query.SELECT.limit);

        if (req.query.SELECT.where) {
            query.where([
                ...internalFilters,
                'and',
                ...req.query.SELECT.where
            ]);
        } else {
            query.where([
                ...internalFilters,
            ]);
        }

        if (req.query.SELECT.orderBy) {
            query.orderBy(req.query.SELECT.orderBy)
        }

        // if (filteredGroupBy && filteredGroupBy.length > 0) {
        //     query.orderBy([{ ref: filteredGroupBy[0].ref, sort: 'asc' }])
        // }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API_MAINTENANCE_NOTIFICATION ODATA V2 in CSN.
            // query.groupBy(req.query.SELECT.groupBy)
        }

        let results = await API_MAINTENANCEORDER.tx(req).send({
            query: query,
        });

        // Populate extension field with value 1.
        // results = results.map(async (item) => {
        //     item.CountNum = 1;
        //     return item
        // });

        let finalRes = await Promise.all(results);

        if (req.query.SELECT.groupBy) {
            let result = [];
            let cond = req.query.SELECT.columns.map(col => {
                return col.ref[0];
            }).join();

            result = alasql('SELECT COUNT(*) AS InternalCount,' + cond + ' FROM ? GROUP BY ' + cond + ' ORDER BY ' + cond, [finalRes]);
            result = result.map(item => {
                item.CountNum = item.InternalCount;
                delete item.InternalCount;
                return item;
            });

            // console.log(result);

            return result;
        }

        // if (req.query.SELECT.groupBy) {

        //     var result = [];
        //     // TODO: This works assuming array is sorted.
        //     finalRes.reduce(function (res, value) {
        //         if (!res[value[filteredGroupBy[0].ref[0]]]) {
        //             res[value[filteredGroupBy[0].ref[0]]] = {
        //                 [filteredGroupBy[0].ref[0]]: value[filteredGroupBy[0].ref[0]],
        //                 [sMeasureParam]: 0,
        //                 ...value
        //             };
        //             result.push(res[value[filteredGroupBy[0].ref[0]]])
        //         }
        //         res[value[filteredGroupBy[0].ref[0]]][sMeasureParam] += value[sMeasureParam];
        //         return res;
        //     }, {});

        //     // TODO: Refactor $count=true to single function
        //     if (req.query.SELECT.count) {
        //         result['$count'] = result.length
        //     }

        //     return result;
        // }

        if (req.query.SELECT.count) {
            finalRes['$count'] = finalRes.length
        }

        console.log(results.length);

        return finalRes;

    });

    srv.on(['READ'], WorkOrderFilters, async (req) => {
        return API_MAINTENANCEORDER.tx(req).run(req.query);
    });

    srv.on(['READ'], C_MaintOrderTypeVH, async (req) => {
        return API_MAINTENANCEORDER.tx(req).run(req.query);
    });

    srv.on(['READ'], I_PMNotificationPriority, async (req) => {
        return API_MAINTENANCEORDER.tx(req).run(req.query);
    });

});



