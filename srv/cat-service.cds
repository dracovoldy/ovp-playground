using {com.analytics.pm as schema} from '../db/schema';

service CatalogService {

    view MaintenanceOrderAnalytics as SELECT FROM schema.MaintenanceOrder {
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
            Counter
        }
}
