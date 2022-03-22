// @ts-ignore
sap.ui.define([

    "sap/ui/model/Filter",
    "sap/m/MessageToast",
    "sap/base/Log"
    // @ts-ignore
], function (Filter, MessageToast, Log) {
    "use strict";

    // controller for custom filter, navigation param, action(quick view and global filter), navigation target 
    // @ts-ignore
    return sap.ui.controller("com.chevron.dcore.analyticspoc.ext.OVPControllerExt", {

        onInit: function (oEvent) {
            //Get SmartFilterBar
            var oGlobalFilter = this.getView().byId(this.getView().getId() + '--ovpGlobalFilter')

            oGlobalFilter.attachInitialized(function (oEvent) {
                var lowDate = new Date(new Date().getFullYear(), 0, 1);
                var highDate = new Date();

                var oDefaultFilter = {
                    "MaintenanceOrderType": {
                        items: [
                            {
                                key: "YA01",
                                text: "YA01"
                            },
                            {
                                key: "YA02",
                                text: "YA02"
                            },
                            {
                                key: "YA03",
                                text: "YA03"
                            },
                            {
                                key: "YA04",
                                text: "YA04"
                            }
                        ]
                    },
                    "MaintOrderReferenceDate": {
                        "ranges": [{
                            "exclude": false,
                            "operation": "BT",
                            "keyField": "MaintOrderReferenceDate",
                            "value1": lowDate,
                            "value2": highDate
                        }]
                    }
                };

                //Set SmartFilterBar initial values
                this.setFilterData(oDefaultFilter);
            });


        }

    });
});