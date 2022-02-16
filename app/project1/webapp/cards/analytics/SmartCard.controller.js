sap.ui.define(['sap/ui/core/mvc/Controller', "sap/ui/core/ResizeHandler"],
    function (Controller, ResizeHandler) {
        "use strict";
        /*global sap, jQuery */

        /*
        Here you can put Controller code
        */
        return Controller.extend("project1.cards.analytics.SmartCard", {

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
                var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[0];

                var oCompData = this.getOwnerComponent().getComponentData();
                var oAppComponent = oCompData.appComponent;
                var oDashboardLayoutUtil = oAppComponent.getDashboardLayoutUtil();
                var cardId = oCompData.cardId;
                var oCard = oDashboardLayoutUtil.dashboardLayoutModel.getCardById(cardId);

                let { settings: { custom: { height: initial_height }, entitySet }, dashboardLayout: { height } } = oCard;
                console.log(oCard)

                if (oDashboardLayoutUtil.isCardAutoSpan(oCompData.cardId)) {
                    this.resizeHandlerId = ResizeHandler.register(this.getView(), function (oEvent) {
                        // Log.info('DashboardLayout autoSize:' + oEvent.target.id + ' -> ' + oEvent.size.height);
                        oDashboardLayoutUtil.setAutoCardSpanHeight(oEvent);
                    });
                }

                oSmartChart.setHeight(initial_height + 'px');
                oSmartChart.setEntitySet(entitySet);

                oSmartChart.attachInitialized(function (oControlEvent) {
                    var sIgnoredChartTypes = "bubble, bullet, line, pie, donut, " +
                        "vertical_bullet, 100_stacked_bar, " +
                        "100_stacked_column, waterfall, horizontal_waterfall";

                    oSmartChart.setIgnoredChartTypes(sIgnoredChartTypes);

                    oSmartChart.getChartAsync().then(function (oInnerChart) {
                        oInnerChart.setVizProperties({
                            // categoryAxis: {
                            //     layout: {
                            //         maxHeight: 0.5
                            //     }
                            // },
                            plotArea: {
                                // colorPalette: d3.scale.category20().range(),
                                dataLabel: {
                                    showTotal: true
                                },
                                // drawingEffect: 'glossy'
                            },
                        });
                    });
                }, this);
            },

            onAfterRendering: function () {
                // debugger;
                // var oCompData = this.getOwnerComponent().getComponentData();
                // var oAppComponent = oCompData.appComponent;
                // var oDashboardLayoutUtil = oAppComponent.getDashboardLayoutUtil();
                // var cardId = oCompData.cardId;
                // var oCard = oDashboardLayoutUtil.dashboardLayoutModel.getCardById(cardId);

                // let { settings: { custom: { height: initial_height } } } = oCard;

                // // Set equal to initial height
                // oDashboardLayoutUtil.setAutoCardSpanHeight({
                //     target: {
                //         id: cardId,
                //     },
                //     size: {
                //         height: initial_height
                //     }
                // });
            },

            // Card resize event needs to be implemented by developer
            resizeCard: function (oEvent) {
                // debugger;
                console.log(oEvent);

                var oCompData = this.getOwnerComponent().getComponentData();
                var oAppComponent = oCompData.appComponent;
                var oDashboardLayoutUtil = oAppComponent.getDashboardLayoutUtil();
                var cardId = oCompData.cardId;

                var oCard = oDashboardLayoutUtil.dashboardLayoutModel.getCardById(cardId);
                let { settings: { subTitle } } = oCard;

                var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[0];
                var calcHeight;

                // Hack to pass new height to the smart chart
                if (!subTitle) {
                    calcHeight = parseInt((oEvent.height.split('px')[0]) - (oEvent.headerHeight * 1.22)) + 'px';
                    oSmartChart.setHeight(calcHeight);
                    return;
                } else {
                    calcHeight = parseInt((oEvent.height.split('px')[0]) - (oEvent.headerHeight * 1.5)) + 'px';
                    oSmartChart.setHeight(calcHeight);
                }

            },

            getItemHeight: function (oController, type) {
                return null;
            },
            getHeaderHeight: function () {
                return null;
            }
        });

    });