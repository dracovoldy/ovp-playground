using {deloitte.analytics.pm as model} from '../db/data-model';

service AnalyticsService {

    entity MaintOrders as projection on model.MaintOrders;
    entity OrderTypes as projection on model.OrderTypes;
    entity MaintOrdersAnalytics as projection on model.MaintOrderCube;
}
