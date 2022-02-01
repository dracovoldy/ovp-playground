using {deloitte.analytics.pm as model} from '../db/data-model';

service AnalyticsService {

    entity MaintOrders as projection on model.MaintOrders
    view MaintOrdersAnalytics as select from model.MaintOrdersAnalytics
}
