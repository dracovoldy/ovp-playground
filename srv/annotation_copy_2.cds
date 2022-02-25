using {CatalogService} from './cat-service';

annotate CatalogService.WorkOrderAnalytics1 with {
    CountNum
    @Common.Label : 'Work Orders';
};

// annotate CatalogService.WorkOrderAnalytics1 with {
//     MaintenanceOrderType
//     @AnalyticalContext.Dimension : true
//     @UI.ValueCriticality         : [
//         {
//             $Type       : 'UI.ValueCriticalityType',
//             Value       : 'YA01',
//             Criticality : #Critical,
//         },
//         {
//             $Type       : 'UI.ValueCriticalityType',
//             Value       : 'YA02',
//             Criticality : #Negative,
//         },
//         {
//             $Type       : 'UI.ValueCriticalityType',
//             Value       : 'YA03',
//             Criticality : #Positive,
//         },
//         {
//             $Type       : 'UI.ValueCriticalityType',
//             Value       : 'YA04',
//             Criticality : #VeryPositive,
//         },
//     ]
// };


// Common Annotations
annotate CatalogService.WorkOrderAnalytics1 with @(UI : {
    // DataPoint #NumberOfNotifs : {
    //     $Type : 'UI.DataPointType',
    //     Value : CountNum,
    // },
    DataPoint  : {
        $Type : 'UI.DataPointType',
        Value : CountNum,
    },
    Identification            : [{
        $Type : 'UI.DataField',
        Value : MaintenanceOrder,
    }]
});


// Report 2 / Option - Priority
annotate CatalogService.WorkOrderAnalytics1 with @(UI : {
    Chart #NotificationsByPriority                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #ColumnStacked,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type                    : 'UI.ChartMeasureAttributeType',
            Measure                  : CountNum,
            Role                     : #Axis1,
            // DataPoint                : '@UI.DataPoint#NumberOfNotifs',
            // UseSequentialColorLevels : true,
        }],
        Dimensions          : [
            MaintPriority,
            MaintenanceOrderType
        ],
        DimensionAttributes : [
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MaintPriority,
                Role      : #Series
            },
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MaintenanceOrderType,
                Role      : #Category
            }
        ],
        @description        : '{i18n>}'
    },
    PresentationVariant #NotificationsByPriorityPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByPriority'],
        SortOrder      : [
            {
                $Type      : 'Common.SortOrderType',
                Property   : MaintPriority,
                Descending : true,
            },
            {
                $Type      : 'Common.SortOrderType',
                Property   : MaintenanceOrderType,
                Descending : true,
            }
        ]
    }
});

// Report 2 / Option - MainWorkCenter
annotate CatalogService.WorkOrderAnalytics1 with @(UI : {
    Chart #OrdersByWorkCenter                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            // DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [
            MainWorkCenter,
            MaintenanceOrderType
        ],
        DimensionAttributes : [
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MainWorkCenter,
                Role      : #Category
            },
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MaintenanceOrderType,
                Role      : #Category
            }
        ],
        @description        : '{i18n>}'
    },
    PresentationVariant #OrdersByWorkCenterPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#OrdersByWorkCenter'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MainWorkCenter,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});

// Report 2 / Option - OrdersByPlannerGroup
annotate CatalogService.WorkOrderAnalytics1 with @(UI : {
    Chart #OrdersByPlannerGroup                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            // DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [MaintenancePlannerGroup],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : MaintenancePlannerGroup,
            Role      : #Category
        }],
        @description        : '{i18n>}'
    },
    PresentationVariant #OrdersByPlannerGroupPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#OrdersByPlannerGroup'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MaintenancePlannerGroup,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});

// Report 2 / Option - MaintenancePlanningPlant
annotate CatalogService.WorkOrderAnalytics1 with @(UI : {
    Chart #OrdersByPlanningPlant                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            // DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [
            MaintenancePlanningPlant,
            MaintenanceOrderType
        ],
        DimensionAttributes : [
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MaintenancePlanningPlant,
                Role      : #Series
            },
            {
                $Type     : 'UI.ChartDimensionAttributeType',
                Dimension : MaintenanceOrderType,
                Role      : #Category
            }
        ],
        @description        : '{i18n>}'
    },
    PresentationVariant #OrdersByPlanningPlantPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#OrdersByPlanningPlant'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MaintenancePlanningPlant,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});
