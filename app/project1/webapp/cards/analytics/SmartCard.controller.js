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

                // set max height for categoryAxis in order to allow longer labels being fully displayed
                var oSmartChart = this.getView().byId("schart");

                oSmartChart.attachInitialized(function (oControlEvent) {
                    var sIgnoredChartTypes = "bubble, bullet, line, pie, donut, " +
                        "vertical_bullet, 100_stacked_bar, " +
                        "100_stacked_column, waterfall, horizontal_waterfall";

                    oSmartChart.setIgnoredChartTypes(sIgnoredChartTypes);
                    oSmartChart.getChartAsync().then(function (oInnerChart) {

                        debugger;
                        console.log(oInnerChart)
                        oInnerChart.setVizProperties({
                            // categoryAxis: {
                            //     layout: {
                            //         maxHeight: 0.5
                            //     }
                            // },
                            plotArea: {
                                colorPalette: d3.scale.category20().range(),
                                dataLabel: {
                                    showTotal: true
                                },
                                drawingEffect: 'glossy'
                            },
                        });
                    });
                }, this);
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