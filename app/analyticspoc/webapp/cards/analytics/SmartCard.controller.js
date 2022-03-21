sap.ui.define(["sap/ovp/cards/generic/Card.controller"],
    function (CardController) {
        "use strict";
        return CardController.extend("com.chevron.dcore.analyticspoc.cards.analytics.SmartCard", {
            onInit: function () {
                CardController.prototype.onInit.apply(this, arguments);

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
                    //handle data binding each time new tab component is initialized
                    // debugger;
                    

                    // TODO : SmartChart binding with and without tabs can be refactored into single func.
                    var tab = tabs[parseInt(this.getView().getId().split('_')[1].split('Tab')[1]) - 1];
                    var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[1];
                    oSmartChart.setHeight(initial_height + 'px');
    
                    if (tab.chartAnnotationPath) {
                        oSmartChart.data("chartQualifier", tab.chartAnnotationPath.split('#')[1]);
                    }
                    if (tab.presentationVariantAnnotationPath) {
                        oSmartChart.data("presentationVariantQualifier", tab.presentationVariantAnnotationPath.split('#')[1]);
                    }
                    oSmartChart.setEntitySet(tab.entitySet);
                    

                    // TODO: Make Ignored chartypes sync with manifest prop aIgnoredChartTypes
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
                    return;
                }

                var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[0];
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
                let { settings: { subTitle, tabs } } = oCard;

                var oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[0];
                var calcHeight;

                // Hack to pass new height to the smart chart
                if (tabs && !subTitle) {
                    oSmartChart = this.getView().byId(this.getView().getId() + "--ovpCardContentContainer").getAggregation("items")[1];
                    calcHeight = parseInt((oEvent.height.split('px')[0]) - (oEvent.headerHeight * 0.8)) + 'px';
                    oSmartChart.setHeight(calcHeight);
                    return;
                } else if (!subTitle){
                    calcHeight = parseInt((oEvent.height.split('px')[0]) - (oEvent.headerHeight * 1.00)) + 'px';
                    oSmartChart.setHeight(calcHeight);
                    return;
                } else {
                    calcHeight = parseInt((oEvent.height.split('px')[0]) - (oEvent.headerHeight * 1.5)) + 'px';
                    oSmartChart.setHeight(calcHeight);
                    return;
                }

            },

        });
    }
);