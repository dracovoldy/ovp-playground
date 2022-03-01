using {AnalyticsService} from './service';

annotate AnalyticsService.MaintOrdersAnalytics with{
    MaintenanceOrderType @(Common : {
        Text            : MaintenanceOrderType_Text,
        TextArrangement : #TextLast,
    });
};

// Common Annotations
annotate AnalyticsService.MaintOrdersAnalytics with @(UI : {
    DataPoint                 : {
        $Type : 'UI.DataPointType',
        Value : OrderCounter,
    },
    Identification            : [{
        $Type : 'UI.DataField',
        Value : MaintenanceOrder,
    }]
});

annotate AnalyticsService.MaintOrdersAnalytics with
@(UI : {
    Chart : {
    $Type               : 'UI.ChartDefinitionType',
    ChartType           : #Column,
    Measures            : ['OrderCounter'],
    MeasureAttributes   : [{
        $Type   : 'UI.ChartMeasureAttributeType',
        Measure : 'OrderCounter',
        Role    : #Axis1
    }],
    Dimensions          : [
        'MaintPriorityType',
        'MaintenanceOrderType',
    ],
    DimensionAttributes : [
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintenanceOrderType',
            Role      : #Category,
        },
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintPriorityType',
            Role      : #Category
        }
    ]
}});

annotate AnalyticsService.MaintOrdersAnalytics with
@(UI : {
    Chart#ByOrderType : {
    $Type               : 'UI.ChartDefinitionType',
    ChartType           : #Column,
    Measures            : ['OrderCounter'],
    MeasureAttributes   : [{
        $Type   : 'UI.ChartMeasureAttributeType',
        Measure : 'OrderCounter',
        Role    : #Axis1
    }],
    Dimensions          : [
        'MaintenanceOrderType',
    ],
    DimensionAttributes : [
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintenanceOrderType',
            Role      : #Category,
        }
    ]
}});

annotate AnalyticsService.MaintOrders with @(UI : {
    SelectionFields : [
        MaintPriorityType,
        MaintenanceOrderType,
        MaintenanceOrderType_Text
    ],
    LineItem        : [
        {Value : MaintenanceOrder},
        {Value : MaintPriority},
        {Value : MaintPriorityType},
        {Value : MaintenanceOrderType},
        {Value : MaintenanceOrderType_Text},
    ],
});
