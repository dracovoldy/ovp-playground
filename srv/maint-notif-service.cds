using {API_MAINTNOTIFICATION as external} from './external/API_MAINTNOTIFICATION.csn';

service MaintNotifService {

    @cds.persistence : {
        table,
        skip : false
    }
    @cds.autoexpose
    entity MaintenanceNotification as projection on external.MaintenanceNotification {
        key MaintenanceNotification as ID,

        MaintNotifInternalID,

        MaintPriority, MaintPriorityDesc,

        NotificationType,

        NotifProcessingPhase, ConcatenatedActiveSystStsName,

        MainWorkCenter, MainWorkCenterPlant,

        ABCIndicator, ABCIndicatorDesc,

        MaintenancePlannerGroupName,

        MaintNotificationCode as FailureCode,

        MaintNotificationCodeGroup as FailureCodeGroup

    };

    @cds.persistence                                 : {
        table,
        skip : false
    }
    @cds.autoexpose
    @Aggregation.ApplySupported.PropertyRestrictions : true
    entity NotificationAnalytics   as projection on external.MaintenanceNotification {

        key MaintenanceNotification as ID,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'MaintPriorityDesc'
        MaintPriority,

        MaintPriorityDesc,

        @AnalyticalContext.Dimension  : true
        NotificationType,

        NotifProcessingPhase, ConcatenatedActiveSystStsName,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'MainWorkCenterPlant'
        MainWorkCenter, 
        
        MainWorkCenterPlant,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'ABCIndicatorDesc'
        ABCIndicator,
        
        ABCIndicatorDesc,

        @AnalyticalContext.Dimension  : true
        MaintenancePlannerGroupName,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'FailureCodeGroup'
        MaintNotificationCode as FailureCode,

        MaintNotificationCodeGroup as FailureCodeGroup,

        @AnalyticalContext.Measure    : true
        @Aggregation.default          : #SUM
        @Core.Computed
        1 as CountNum : Integer
    }

    @cds.persistence                                 : {
        table,
        skip : false
    }
    @cds.autoexpose
    @Aggregation.ApplySupported.PropertyRestrictions : true
    entity NotificationAnalyticsAccepted   as projection on external.MaintenanceNotification {

        key MaintenanceNotification as ID,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'MaintPriorityDesc'
        MaintPriority,

        MaintPriorityDesc,

        @AnalyticalContext.Dimension  : true
        NotificationType,

        NotifProcessingPhase, ConcatenatedActiveSystStsName,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'MainWorkCenterPlant'
        MainWorkCenter, 
        
        MainWorkCenterPlant,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'ABCIndicatorDesc'
        ABCIndicator,
        
        ABCIndicatorDesc,

        @AnalyticalContext.Dimension  : true
        MaintenancePlannerGroupName,

        @AnalyticalContext.Dimension  : true
        @Consumption.groupWithElement : 'FailureCodeGroup'
        MaintNotificationCode as FailureCode,

        MaintNotificationCodeGroup as FailureCodeGroup,

        @AnalyticalContext.Measure    : true
        @Aggregation.default          : #SUM
        @Core.Computed
        1 as CountNum : Integer
    }

};
