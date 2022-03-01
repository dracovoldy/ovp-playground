sap.ui.define(["sap/ovp/cards/generic/Card.controller"],
    function (CardController) {
        "use strict";
        return CardController.extend("project1.cards.analytics.SmartCard", {
            onInit: function () {
                CardController.prototype.onInit.apply(this, arguments);

                var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[0];

                var oCompData = this.getOwnerComponent().getComponentData();
                var oAppComponent = oCompData.appComponent;
                var oDashboardLayoutUtil = oAppComponent.getDashboardLayoutUtil();
                var cardId = oCompData.cardId;
                var oCard = oDashboardLayoutUtil.dashboardLayoutModel.getCardById(cardId);

                let {
                    settings: {
                        tabs,
                        custom: {
                            height: initial_height
                        },
                        entitySet,
                        chartAnnotationPath,
                        presentationVariantAnnotationPath
                    },
                    dashboardLayout
                } = oCard;

                if(tabs) {
                    debugger;
                }

                oSmartChart.setHeight(initial_height + 'px');

                if (chartAnnotationPath) {
                    oSmartChart.data("chartQualifier", chartAnnotationPath.split('#')[1]);
                }
                if (presentationVariantAnnotationPath) {
                    oSmartChart.data("presentationVariantQualifier", presentationVariantAnnotationPath.split('#')[1]);
                }
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
                CardController.prototype.onAfterRendering.apply(this, arguments);
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

        });
    }
);