using {com.analytics.pm as schema} from '../db/schema';

service CatalogService {

    view MaintenanceOrderAnalytics as
        select from schema.MaintenanceOrder {
            MaintenanceOrder,
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
            MaintenancePhaseControl,
            MaintOrderReferenceDate,
            Counter
        };

    view MaintenanceOrderCompleteAnalytics as 
        select from schema.MaintOrderCalendarDate {
            MaintenanceOrder,
            MaintenanceOrderType,
            LatestAcceptableCompletionDate,
            CalendarYear,
            CalendarWeek,
            CompletionDateDim,
            MaintOrderReferenceDate,
            Counter
        };
    
    view MaintenanceOrderAgeAnalytics as 
        select from schema.MaintOrderChangeDocs {
            MaintenanceOrder,
            MaintenanceOrderInternalID,
            MaintOrderReferenceDate,
            Bucket,
            Counter
        };
        
}
