using {AnalyticsService} from './service';

annotate AnalyticsService.MaintOrdersAnalytics {
    @UI.ValueCriticality : [
        {
            $Type       : 'UI.ValueCriticalityType',
            Value       : 'Y1',
            Criticality : #Positive,
        },
        {
            $Type       : 'UI.ValueCriticalityType',
            Value       : 'Y2',
            Criticality : #Negative,
        },
        {
            $Type       : 'UI.ValueCriticalityType',
            Value       : 'Y3',
            Criticality : #Critical,
        },
        {
            $Type       : 'UI.ValueCriticalityType',
            Value       : 'Y4',
            Criticality : #Neutral,
        }
    ]
    MaintPriorityType

};

annotate AnalyticsService.MaintOrdersAnalytics with
@(UI : {Chart : {
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
        'MaintPriorityType'
    ],
    DimensionAttributes : [
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintenanceOrderType',
            Role      : #Category
        },
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintPriorityType',
            Role      : #Category
        }
    ]
}});

annotate AnalyticsService.MaintOrders with
@(UI : {
    SelectionFields : [
        MaintPriorityType,
        MaintenanceOrderType
    ],
    LineItem        : [
        {Value : MaintenanceOrder},
        {Value : MaintPriority},
        {Value : MaintPriorityType},
        {Value : MaintenanceOrderType}
    ],
});
