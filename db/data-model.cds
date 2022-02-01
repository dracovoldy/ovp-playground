namespace deloitte.analytics.pm;

entity MaintOrders {
        @title : 'Maintenance Order #'
    key MaintenanceOrder     : String;
        @title : 'Order Type'
        MaintenanceOrderType : String;
        @title : 'Priority'
        MaintPriority        : String;
        @title : 'Priority Type'
        MaintPriorityType    : String;
};

@Aggregation.ApplySupported.PropertyRestrictions : true
view MaintOrdersAnalytics as
    select from MaintOrders {
        key MaintenanceOrder,
            @Analytics.Dimension : true
            MaintenanceOrderType,

            @Analytics.Dimension : true
            MaintPriority,

            @Analytics.Dimension : true
            MaintPriorityType,

            @Analytics.Measure   : true
            @Aggregation.default : #SUM
            @title : 'Number of Orders'
            1 as OrderCounter : Integer
    };
