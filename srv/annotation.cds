using {AnalyticsService} from './service';

annotate AnalyticsService.MaintOrdersAnalytics with @(UI : {Chart : {
    $Type               : 'UI.ChartDefinitionType',
    ChartType           : #ColumnStacked,
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
            Role      : #Series,
        },
        {
            $Type     : 'UI.ChartDimensionAttributeType',
            Dimension : 'MaintPriorityType',
            Role      : #Category
        }
    ]
}});

annotate AnalyticsService.MaintOrders with @(UI : {
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

// annotate AnalyticsService.MaintOrders with {
//     @Common.Text: 'MaintenanceOrderTypeText'
//     @Common.TextArrangement : #TextOnly
//     MaintenanceOrderType
// };
