using {MaintNotifService} from './maint-notif-service';

/**
    Open Notifications - NotificationAnalytics
 */

// NotificationType
annotate MaintNotifService.NotificationAnalytics with @(UI : {
    Chart #NotificationsByType       : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Donut,
        // Description         : 'Column Chart',
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [NotificationType],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : NotificationType,
            Role      : #Category
        }],
        AxisScaling: {
            $Type : 'UI.ChartAxisScalingType',
            ScaleBehavior : #AutoScale,
            AutoScaleBehavior : {
                $Type : 'UI.ChartAxisAutoScaleBehaviorType',
            }
        }
    },
    PresentationVariant #NotificationsByTypePreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByType'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : NotificationType,
        // DynamicProperty : '',
        // Descending : ,
        }]
    },
    DataPoint #NumberOfNotifs        : {
        $Type : 'UI.DataPointType',
        Value : CountNum,
    },
    Identification                   : [{
        $Type : 'UI.DataField',
        Value : ID,
    }]
});

// Priority
annotate MaintNotifService.NotificationAnalytics with @(UI : {
    Chart #NotificationsByPriority                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        // Description         : 'Donut Chart',
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [MaintPriority],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : MaintPriority,
            Role      : #Category
        }],
        @description        : '{i18n>}'
    },
    PresentationVariant #NotificationsByPriorityPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByPriority'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MaintPriority,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});

// MainWorkCenter
annotate MaintNotifService.NotificationAnalytics with @(UI : {
    Chart #NotificationsByWorkCenter                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs',
        }],
        Dimensions          : [MainWorkCenter],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : MainWorkCenter,
            Role      : #Category
        }],
    },
    PresentationVariant #NotificationsByWorkCenterPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByWorkCenter'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MainWorkCenter,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});

// ABCIndicator
annotate MaintNotifService.NotificationAnalytics with @(UI : {
    Chart #NotificationsByABCIndicator                   : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs',
        }],
        Dimensions          : [ABCIndicator],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : ABCIndicator,
            Role      : #Category
        }],
    },
    PresentationVariant #NotificationsByABCIndicatorPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByABCIndicator'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : ABCIndicator,
        // DynamicProperty : '',
        // Descending : ,
        }]
    }
});


/**
    Open Notifications - NotificationAnalyticsAccepted
 */

// NotificationType
annotate MaintNotifService.NotificationAnalyticsAccepted with @(UI : {
    Chart #NotificationsByType       : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Donut,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [NotificationType],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : NotificationType,
            Role      : #Category
        }],
        AxisScaling: {
            $Type : 'UI.ChartAxisScalingType',
            ScaleBehavior : #AutoScale,
            AutoScaleBehavior : {
                $Type : 'UI.ChartAxisAutoScaleBehaviorType',
            }
        }
    },
    PresentationVariant #NotificationsByTypePreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByType'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : NotificationType,
        }]
    },
    DataPoint #NumberOfNotifs        : {
        $Type : 'UI.DataPointType',
        Value : CountNum,
    },
    Identification                   : [{
        $Type : 'UI.DataField',
        Value : ID,
    }]
});

// Priority
annotate MaintNotifService.NotificationAnalyticsAccepted with @(UI : {
    Chart #NotificationsByPriority                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        // Description         : 'Donut Chart',
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs'
        }],
        Dimensions          : [MaintPriority],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : MaintPriority,
            Role      : #Category
        }],
    },
    PresentationVariant #NotificationsByPriorityPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByPriority'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MaintPriority,
        }]
    }
});

// WorkCenter
annotate MaintNotifService.NotificationAnalyticsAccepted with @(UI : {
    Chart #NotificationsByWorkCenter                     : {
        $Type               : 'UI.ChartDefinitionType',
        ChartType           : #Column,
        Measures            : [CountNum],
        MeasureAttributes   : [{
            $Type     : 'UI.ChartMeasureAttributeType',
            Measure   : CountNum,
            Role      : #Axis1,
            DataPoint : '@UI.DataPoint#NumberOfNotifs',
        }],
        Dimensions          : [MainWorkCenter],
        DimensionAttributes : [{
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : MainWorkCenter,
            Role      : #Category
        }],
    },
    PresentationVariant #NotificationsByWorkCenterPreVar : {
        $Type          : 'UI.PresentationVariantType',
        Visualizations : ['@UI.Chart#NotificationsByWorkCenter'],
        SortOrder      : [{
            $Type    : 'Common.SortOrderType',
            Property : MainWorkCenter,
        }]
    }
});

