// using my.bookshop as my from '../db/data-model';
using {EAM_OBJPG_MAINTENANCEORDER_SRV as external} from './external/EAM_OBJPG_MAINTENANCEORDER_SRV.csn';

service CatalogService {

    // @cds.persistence                                 : {
    //     table,
    //     skip : false
    // }
    // @cds.autoexpose
    @Aggregation.ApplySupported.PropertyRestrictions : true
    entity WorkOrderAnalytics1 as projection on external.C_ObjPgMaintOrder {
        key MaintenanceOrder,

        @Analytics.Dimension  : true
        @Consumption.groupWithElement : 'MaintPriority_Text'
        MaintPriority,
        MaintPriority_Text,

        @Analytics.Dimension  : true
        MainWorkCenter,

        @Analytics.Dimension  : true
        @Consumption.groupWithElement : 'MaintenancePlannerGroup_Text'
        MaintenancePlannerGroup,
        MaintenancePlannerGroup_Text,

        @Analytics.Dimension  : true
        @Consumption.groupWithElement : 'MaintenancePlanningPlantName'
        MaintenancePlanningPlant,
        MaintenancePlanningPlantName,

        @Analytics.Dimension  : true
        // @Consumption.groupWithElement : 'MaintenanceOrderTypeName'
        MaintenanceOrderType,

        MaintOrdProcessSubPhaseCode,
        ConcatenatedOrderPhaseCtrlText,
        @Analytics.Measure    : true
        @Aggregation.default          : #SUM
        @Core.Computed
        1 as CountNum : Integer
    };

    entity WorkOrderFilters as projection on external.C_ObjPgMaintOrder {
        MaintenanceOrderType,
        @UI.HiddenFilter
        MaintenanceOrderTypeName,
        MaintPriority,
        @UI.HiddenFilter
        MaintPriorityType
    }

    entity C_MaintOrderTypeVH as projection on external.C_MaintOrderTypeVH;
    entity I_PMNotificationPriority as projection on external.I_PMNotificationPriority;

}
