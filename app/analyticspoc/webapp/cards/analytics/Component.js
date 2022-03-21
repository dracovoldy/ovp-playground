sap.ui.define(["sap/ovp/cards/generic/Component"],
    function (CardComponent) {
        "use strict";

        /* component for custom card */
        return CardComponent.extend("com.chevron.dcore.analyticspoc.cards.analytics.Component", {
            // use inline declaration instead of component.json to save 1 round trip
            metadata: {
                properties: {
                    "contentFragment": {
                        "type": "string",
                        "defaultValue": "com.chevron.dcore.analyticspoc.cards.analytics.SmartCard"
                    },
                    "controllerName": {
                        "type": "string",
                        "defaultValue": "com.chevron.dcore.analyticspoc.cards.analytics.SmartCard"
                    }
                },

                version: "${version}",

                library: "sap.ovp",

                includes: [],

                dependencies: {
                    libs: ["sap.m", "sap.ui.comp"],
                    components: []
                },
                config: {},
                customizing: {
                    "sap.ui.controllerExtensions": {
                        "sap.ovp.cards.generic.Card": {
                            controllerName: "com.chevron.dcore.analyticspoc.cards.analytics.SmartCard"
                        }
                    }
                }
            }
        });
    });