namespace chevron.ui.maintnotifdashboard;

using {managed} from '@sap/cds/common';
using {API_MAINTNOTIFICATION as external} from '../srv/external/API_MAINTNOTIFICATION.csn';

@mashup entity EMaintNotification as projection on external.MaintenanceNotification {
    key MaintenanceNotification as ID,

    @Consumption.groupWithElement: 'PriorityDesc'
    MaintPriority,
    MaintPriorityDesc,

    NotificationType,
    NotifProcessingPhase,
    ConcatenatedActiveSystStsName,

    MainWorkCenter,
    MainWorkCenterPlant,

    ABCIndicator,
    ABCIndicatorDesc,

    MaintenancePlannerGroupName,

    MaintNotificationCode as FailureCode,
    MaintNotificationCodeGroup as FailureCodeGroup,

    NotificationReferenceDate as ReferenceDate,
    NotificationReferenceTime as ReferenceTime,
    
    1 as CountNum: TechnicalFieldControlFlag
};

type TechnicalFieldControlFlag : Integer @(
    Core.Computed
);


