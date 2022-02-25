using {EMaintNotificationService} from './enotif-service';

annotate EMaintNotificationService.NotificationAnalytics with @(
    UI : {Chart #NotificationsByType : {
    $Type               : 'UI.ChartDefinitionType',
    ChartType           : #Donut,
    Description         : 'Column Chart',
    Measures            : [CountNum],
    MeasureAttributes   : [{
        $Type   : 'UI.ChartMeasureAttributeType',
        Measure : CountNum,
        Role    : #Axis1,
        DataPoint : '@UI.DataPoint#NumberOfNotifs'
    }],
    Dimensions          : [NotificationType],
    DimensionAttributes : [{
        $Type     : 'UI.ChartDimensionAttributeType',
        Dimension : NotificationType,
        Role      : #Category
    }]
},
PresentationVariant #donutPreVar : {
    $Type          : 'UI.PresentationVariantType',
    Visualizations : ['@UI.Chart#NotificationsByType'],
    SortOrder      : [{
        $Type    : 'Common.SortOrderType',
        Property : CountNum
    }]
},
DataPoint #NumberOfNotifs        : {
    $Type : 'UI.DataPointType',
    Value : CountNum,
    Title : 'Notifications'
},
Identification                   : [{
    $Type : 'UI.DataField',
    Value : ID,
}]
});
