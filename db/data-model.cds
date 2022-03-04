/*

namespace deloitte.analytics.pm;

entity MaintOrders {
        @title : 'Maintenance Order #'
    key MaintenanceOrder          : String;
        @title : 'Order Type'
        MaintenanceOrderType      : String;
        @title : 'Order Type Text'
        MaintenanceOrderType_Text : String;
        @title : 'Priority'
        MaintPriority             : String;
        @title : 'Priority Type'
        MaintPriorityType         : String;
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
            MaintenanceOrderType,
            OrderTypes.OrderTypeText as MaintenanceOrderType_Text,
            MaintPriority,
            MaintPriorityType,
            1                        as OrderCounter : Integer
    };

*/