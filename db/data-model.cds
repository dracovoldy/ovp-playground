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

entity MaintPriority {
    key MaintPriority     : String;
        MaintPriorityText : String;
}

entity OrderTypes {
    key ID            : String;
        OrderTypeText : String;
}

@Aggregation.ApplySupported.PropertyRestrictions : true
view MaintOrderCube as
    select from MaintOrders
    join OrderTypes
        on OrderTypes.ID = MaintenanceOrderType
    {
        key MaintenanceOrder,
            @Analytics.Dimension          : true
            @Consumption.groupWithElement : 'OrderTypeText'
            MaintenanceOrderType,
            OrderTypes.OrderTypeText,

            @Analytics.Dimension          : true
            MaintPriority,

            @Analytics.Dimension          : true
            MaintPriorityType,

            @Analytics.Measure            : true
            @Aggregation.default          : #SUM
            @title                        : 'Number of Orders'
            1                        as OrderCounter : Integer
    };      