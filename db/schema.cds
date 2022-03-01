namespace com.analytics.pm;

using {managed} from '@sap/cds/common';
using {API_MAINTENANCEORDER as maintorderext} from '../srv/external/API_MAINTENANCEORDER.csn';

@mashup
entity MaintenanceOrder   as projection on maintorderext.MaintenanceOrder {
    key MaintenanceOrder,
    MaintenanceOrderType,
    MaintenanceOrderDesc,
    MaintOrdBasicStartDate,
    MaintOrdBasicEndDate,
    MaintenancePlanningPlant,
    MaintOrdProcessPhaseCode,
    MaintOrdProcessSubPhaseCode,
    MaintenanceOrderPlanningCode,
    MaintenancePlannerGroup,
    MaintPriority,
    1 as Counter: Integer
}

// @mashup
// entity MaintenanceOrder : maintorderext.MaintenanceOrder {
//     key MaintenanceOrder             : String(12);
//         MaintenanceOrderType         : String(4);
//         MaintenanceOrderDesc         : String(40);
//         MaintOrdBasicStartDate       : DateTime;
//         MaintOrdBasicEndDate         : DateTime;
//         MaintenancePlanningPlant     : String(4);
//         MaintOrdProcessPhaseCode     : String(2);
//         MaintOrdProcessSubPhaseCode  : String(4);
//         MaintenanceOrderPlanningCode : String(1);
//         MaintenancePlannerGroup      : String(3);
//         MaintPriority                : String(1);
//         Counter                      : Integer default 1;
// }
