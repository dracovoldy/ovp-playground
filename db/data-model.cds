namespace deloitte.analytics.pm;

entity MaintOrders {
        @title : 'Maintenance Order #'
    key MaintenanceOrder     : String;
        @title : 'Order Type'
        MaintenanceOrderType : String;
        @title : 'Order Type Text'
        MaintenanceOrderType_Text : String;
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

view MaintOrderCube as
    select from MaintOrders
    join OrderTypes
        on OrderTypes.ID = MaintenanceOrderType
    {
        key MaintenanceOrder,
            // @Analytics.Dimension          : true
            // // @Consumption.groupWithElement : 'MaintenanceOrderType_Text'
            // // @ObjectModel.text.element     : ['MaintenanceOrderType_Text']
            // @Common.Text : 'MaintenanceOrderType_Text'
            // // @UI.TextArrangement           : #TEXT_LAST
            // @Common.TextArrangement: #TextFirst
            MaintenanceOrderType,
            OrderTypes.OrderTypeText as MaintenanceOrderType_Text,

            // @Analytics.Dimension          : true
            MaintPriority,

            // @Analytics.Dimension          : true
            MaintPriorityType,

            // @Analytics.Measure            : true
            // @Aggregation.default          : #SUM
            // @Core.Computed
            // @title                        : 'Number of Orders'
            1                        as OrderCounter : Integer
    };

// annotate AnalyticsService.MaintOrderCube with {
//     @UI.TextArrangement : #TEXT_LAST
//     MaintenanceOrderType
// };
