using {com.analytics.pm as mtd} from '../db/schema';

@path : '/service'
service EMaintNotificationService {
    @readonly
    entity EMaintNotification as projection on mtd.EMaintNotification;

    @Aggregation.ApplySupported.PropertyRestrictions : true
    view NotificationAnalytics as
        select from mtd.EMaintNotification {
            key ID,
                MaintPriority,
                MaintPriorityDesc,

                @Analytics.Dimension : true
                NotificationType,

                NotifProcessingPhase,
                ConcatenatedActiveSystStsName,
                MainWorkCenter,
                MainWorkCenterPlant,
                ABCIndicator,
                ABCIndicatorDesc,
                MaintenancePlannerGroupName,
                FailureCode,
                FailureCodeGroup,
                // MaintNotificationCode,
                // MaintNotificationCodeGroup
                @Analytics.Measure   : true
                @Aggregation.default : #SUM
                CountNum
        };
}
