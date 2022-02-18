using {deloitte.analytics.pm as model} from '../db/data-model';

service AnalyticsService {

    entity MaintOrders as projection on model.MaintOrders;
    entity OrderTypes as projection on model.OrderTypes;
    entity MaintOrdersAnalytics as projection on model.MaintOrderCube {
        key MaintenanceOrder,
            @Analytics.Dimension          : true
            // @Consumption.groupWithElement : 'MaintenanceOrderType_Text'
            @Common.Text : 'MaintenanceOrderType_Text'
            @Common.TextArrangement: #TextFirst
            MaintenanceOrderType,
            MaintenanceOrderType_Text,

            @Analytics.Dimension          : true
            MaintPriority,

            @Analytics.Dimension          : true
            MaintPriorityType,

            @Analytics.Measure            : true
            @Aggregation.default          : #SUM
            @Core.Computed
            @title                        : 'Number of Orders'
            OrderCounter
    };
}
