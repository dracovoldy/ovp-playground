namespace com.analytics.pm;

using {managed} from '@sap/cds/common';
using {API_MAINTNOTIFICATION as external} from '../srv/external/API_MAINTNOTIFICATION.csn';
using {API_MAINTENANCEORDER as maintorderext} from '../srv/external/API_MAINTENANCEORDER.csn';

@mashup
entity EMaintNotification as projection on external.MaintenanceNotification {
    key MaintenanceNotification as ID,

    @Consumption.groupWithElement : 'PriorityDesc'
    MaintPriority, MaintPriorityDesc,

    NotificationType, NotifProcessingPhase, ConcatenatedActiveSystStsName,

    MainWorkCenter, MainWorkCenterPlant,

    ABCIndicator, ABCIndicatorDesc,

    MaintenancePlannerGroupName,

    MaintNotificationCode as FailureCode, MaintNotificationCodeGroup as FailureCodeGroup,

    NotificationReferenceDate as ReferenceDate, NotificationReferenceTime as ReferenceTime,

    1 as CountNum : TechnicalFieldControlFlag
};

type TechnicalFieldControlFlag : Integer @(Core.Computed);

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
