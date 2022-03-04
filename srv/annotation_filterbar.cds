/*

using {CatalogService} from './cat-service';

annotate CatalogService.WorkOrderFilters with @(
    UI.SelectionFields : [
        MaintenanceOrderType,
        MaintPriority,
    ],
);

annotate CatalogService.WorkOrderFilters with{
    
    MaintenanceOrderType @(Common : {
        Text            : MaintenanceOrderTypeName,
        TextArrangement : #TextLast,
        ValueList       : {
            Label          : 'Order Type',
            CollectionPath : 'C_MaintOrderTypeVH',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'MaintenanceOrderType',
                    LocalDataProperty : MaintenanceOrderType
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'MaintenanceOrderType',
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'MaintenanceOrderTypeName',
                }
                
            ]
        }
    });

    MaintPriority @(Common : {
        Text            : MaintPriority,
        TextArrangement : #TextSeparate,
        ValueList       : {
            Label          : 'Priority',
            CollectionPath : 'I_PMNotificationPriority',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'MaintPriority',
                    LocalDataProperty : MaintPriority
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'MaintPriorityType',
                },
                {
                    $Type: 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty: 'MaintPriority_Text',
                }
            ]
        }
    });
};

*/