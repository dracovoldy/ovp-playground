(['sap/ui/core/mvc/Controller',],
    function (Controller) {
        "use strict";
        /*global sap, jQuery */

        /*
        Here you can put Controller code
        */
        sap.ui.controller("project1.cards.analytics.SmartCard", {

            /* ============================================================ */
            /* Life-cycle Handling                                          */
            /* ============================================================ */
            /**
             * Method called when the application is initalized.
             *
             * @public
             */
            onInit: function () {
                // debugger;
            },

            onAfterRendering: function () {
                // debugger;
                var oCompData = this.getOwnerComponent().getComponentData();
                var oAppComponent = oCompData.appComponent;
                var oDashboardLayoutUtil = oAppComponent.getDashboardLayoutUtil();
                var cardId = oCompData.cardId;
                oDashboardLayoutUtil.setAutoCardSpanHeight({
                    target: {
                        id: cardId,
                    },
                    size: {
                        height: 500
                    }
                });
            },
            // Card resize event needs to be implemented by developer
            resizeCard: function (oEvent) {
                // debugger;
                console.log(oEvent)
                // Hack to pass new height to the smart chart
                this.getView().byId("schart").setHeight(parseInt((oEvent.height.split('px')[0]) - oEvent.headerHeight) + 'px');
            },

            getItemHeight: function (oController, type) {
                return '10px';
            },
            getHeaderHeight: function () {
                return '10px';
            }

        });
    })();