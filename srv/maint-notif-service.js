const cds = require('@sap/cds');
// const Enumerable = require('linq');

module.exports = async (srv) => {
    const APIMaintNotification = await cds.connect.to('API_MAINTNOTIFICATION')
    const { MaintenanceNotification, NotificationAnalytics, NotificationAnalyticsAccepted } = srv.entities

    srv.on(['READ'], MaintenanceNotification, async (req) => {
        //Work around that's no longer needed in CAP 5.6 and higher
        /*          if (req.query.SELECT.from.ref[0].where){
                    req.query.SELECT.from.ref[0].where[6].val += 'T00:00:00'
                }  */
        let MaintenanceNotificationQuery = SELECT.from(req.query.SELECT.from)
            .limit(req.query.SELECT.limit)
        if (req.query.SELECT.where) {
            MaintenanceNotificationQuery.where(req.query.SELECT.where)
        }
        if (req.query.SELECT.orderBy) {
            MaintenanceNotificationQuery.orderBy(req.query.SELECT.orderBy)
        }

        let aNotifs = await APIMaintNotification.tx(req).send({
            query: MaintenanceNotificationQuery,
            headers: {
                APIKey: "Jp1AmfmNnO2qzTkqd0EHgZsdHsIPlNW8"
            }
        })

        // console.log(aNotifs)
        // let notifs = []
        // if (Array.isArray(aNotifs)){
        //     aNotifs = notifs
        // }else {aNotifs[0] = notifs}

        const aNotifsWithExtension = aNotifs.map(async (item) => {
            // const data = await SELECT.from(MaintenanceNotification).where({ id: item.id })
            // if (data[0]) {
            //     item.middelName = data[0].middelName
            // } else {
            //     item.middelName = null
            // }

            item.CountNum = 1;
            return item
        })

        const personalsWithExtension = await Promise.all(aNotifsWithExtension)
        if (req.query.SELECT.count) {
            personalsWithExtension['$count'] = personalsWithExtension.length
        }
        return personalsWithExtension;
    })

    srv.on(['READ'], NotificationAnalytics, async (req) => {

        let sMeasureParam = 'CountNum';
        let filteredGroupBy = req.query.SELECT.groupBy ? req.query.SELECT.groupBy.filter(item => {
            if (item.ref[sMeasureParam]) {
                return false;
            }
            return true;
        }) : null;

        // Custom Query for Accepted Notifications; QMEL-PHASE=3
        req.query.SELECT.where = [{ ref: ['NotifProcessingPhase'] }, '=', { val: '3' }]

        let MaintenanceNotificationQuery = SELECT.from(req.query.SELECT.from)
            .limit(req.query.SELECT.limit)
        if (req.query.SELECT.where) {
            MaintenanceNotificationQuery.where(req.query.SELECT.where)
        }
        // if (req.query.SELECT.orderBy) {
        if (filteredGroupBy && filteredGroupBy.length > 0) {
            MaintenanceNotificationQuery.orderBy([{ ref: filteredGroupBy[0].ref, sort: 'asc' }])
        }
        // }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API_MAINTENANCE_NOTIFICATION ODATA V2 in CSN.
            // MaintenanceNotificationQuery.groupBy(req.query.SELECT.groupBy)
        }

        let aNotifs = await APIMaintNotification.tx(req).send({
            query: MaintenanceNotificationQuery,
            // TODO: refactor to remove hard-code apikey
            headers: {
                APIKey: "Jp1AmfmNnO2qzTkqd0EHgZsdHsIPlNW8"
            }
        })

        // Populate extension field with value 1.
        const aNotifsWithExtension = aNotifs.map(async (item) => {
            item.CountNum = 1;
            return item
        });

        var finalRes = await Promise.all(aNotifsWithExtension)

        if (req.query.SELECT.groupBy) {

            var result = [];
            // TODO: This works assuming array is sorted.
            finalRes.reduce(function (res, value) {
                if (!res[value[filteredGroupBy[0].ref[0]]]) {
                    res[value[filteredGroupBy[0].ref[0]]] = { [filteredGroupBy[0].ref[0]]: value[filteredGroupBy[0].ref[0]], [sMeasureParam]: 0 };
                    result.push(res[value[filteredGroupBy[0].ref[0]]])
                }
                res[value[filteredGroupBy[0].ref[0]]][sMeasureParam] += value[sMeasureParam];
                return res;
            }, {});

            // TODO: Refactor $count=true to single function
            if (req.query.SELECT.count) {
                result['$count'] = result.length
            }

            return result;
        }

        if (req.query.SELECT.count) {
            finalRes['$count'] = finalRes.length
        }

        return finalRes;
    })

    srv.on(['READ'], NotificationAnalyticsAccepted, async (req) => {

        let sMeasureParam = 'CountNum';
        let filteredGroupBy = req.query.SELECT.groupBy ? req.query.SELECT.groupBy.filter(item => {
            if (item.ref[sMeasureParam]) {
                return false;
            }
            return true;
        }) : null;

        // Custom Query for Open Notifications
        req.query.SELECT.where = [{ ref: ['NotifProcessingPhase'] }, '=', { val: '1' }]

        let MaintenanceNotificationQuery = SELECT.from(req.query.SELECT.from)
            .limit(req.query.SELECT.limit)
        if (req.query.SELECT.where) {
            MaintenanceNotificationQuery.where(req.query.SELECT.where)
        }
        // if (req.query.SELECT.orderBy) {
        if (filteredGroupBy && filteredGroupBy.length > 0) {
            MaintenanceNotificationQuery.orderBy([{ ref: filteredGroupBy[0].ref, sort: 'asc' }])
        }
        // }

        if (req.query.SELECT.groupBy) {
            // Ignore GroupBy as it is not supported by API_MAINTENANCE_NOTIFICATION ODATA V2 in CSN.
            // MaintenanceNotificationQuery.groupBy(req.query.SELECT.groupBy)
        }

        let aNotifs = await APIMaintNotification.tx(req).send({
            query: MaintenanceNotificationQuery,
            // TODO: refactor to remove hard-code apikey
            headers: {
                APIKey: "Jp1AmfmNnO2qzTkqd0EHgZsdHsIPlNW8"
            }
        })

        // Populate extension field with value 1.
        const aNotifsWithExtension = aNotifs.map(async (item) => {
            item.CountNum = 1;
            return item
        });

        var finalRes = await Promise.all(aNotifsWithExtension)

        if (req.query.SELECT.groupBy) {

            var result = [];
            // TODO: This works assuming array is sorted.
            finalRes.reduce(function (res, value) {
                if (!res[value[filteredGroupBy[0].ref[0]]]) {
                    res[value[filteredGroupBy[0].ref[0]]] = { [filteredGroupBy[0].ref[0]]: value[filteredGroupBy[0].ref[0]], [sMeasureParam]: 0 };
                    result.push(res[value[filteredGroupBy[0].ref[0]]])
                }
                res[value[filteredGroupBy[0].ref[0]]][sMeasureParam] += value[sMeasureParam];
                return res;
            }, {});

            // TODO: Refactor $count=true to single function
            if (req.query.SELECT.count) {
                result['$count'] = result.length
            }

            return result;
        }

        if (req.query.SELECT.count) {
            finalRes['$count'] = finalRes.length
        }

        return finalRes;
    })
}