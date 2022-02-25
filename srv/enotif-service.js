const cds = require('@sap/cds');

/**
* Implementation for enotif-service.cds service
*/
module.exports = cds.service.impl(async function () {
    const srv = await cds.connect.to('API_MAINTNOTIFICATION');

    this.on('READ', 'EMaintNotification', async req => {

        console.log(req.query);
        try {
            return await srv.send({ query: req.query, headers: { APIKey: "Jp1AmfmNnO2qzTkqd0EHgZsdHsIPlNW8" } });

        } catch (err) {
            req.reject(err);
        }
    });

    this.after('READ', 'EMaintNotification', (notifs) => {

        // Accepted status: runtime filtering
        notifs = notifs.filter(item => {
            if (item.ConcatenatedActiveSystStsName != "I052R") {
                return true;
            }
        })

        return notifs.map(async notif => {
            notif.CountNum = 1;
            return notif;
        })

    })

});