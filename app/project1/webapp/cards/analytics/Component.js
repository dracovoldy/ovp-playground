sap.ui.define(["sap/ovp/cards/generic/Component","sap/ovp/cards/jUtils"],
    function (CardComponent,jUtils) {
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
                config: {}
            },
            onAfterRendering: function () {
                jUtils.setAttributeToMultipleElements(".tabindex0", "tabindex", 0);
                jUtils.setAttributeToMultipleElements(".tabindex-1", "tabindex", -1);
            }
        });
    });