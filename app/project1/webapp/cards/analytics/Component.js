sap.ui.define(["sap/ovp/cards/generic/Component"],
    function (CardComponent) {
        "use strict";

        /* component for custom card */
        return CardComponent.extend("project1.cards.analytics.Component", {
            // use inline declaration instead of component.json to save 1 round trip
            metadata: {
                properties: {
                    "contentFragment": {
                        "type": "string",
                        "defaultValue": "project1.cards.analytics.SmartCard"
                    },
                    "headerExtensionFragment": {
                        "type": "string",
                        "defaultValue": "project1.cards.analytics.Header"
                    },
                    "controllerName": {
                        "type": "string",
                        "defaultValue": "project1.cards.analytics.SmartCard"
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
                            controllerName: "project1.cards.analytics.SmartCard"
                        }
                    }
                }
            }
        });
    });