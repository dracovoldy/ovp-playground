using {CatalogService} from './cat-service';

annotate CatalogService.MaintenanceOrderAnalytics with @(
    Aggregation : {ApplySupported : {PropertyRestrictions : true}},
    UI          : {
        SelectionFields             : [
            MaintenanceOrderType,
            MaintPriority,
            MaintenancePlanningPlant,
            MaintOrdProcessPhaseCode
        ],
        PresentationVariant #Chart1 : {Visualizations : ['@UI.Chart#PhaseCodeByOrderType']},
        Chart #PhaseCodeByOrderType : {
            ChartType           : #Column,
            Dimensions          : [
                'MaintOrdProcessPhaseCode',
                'MaintenanceOrderType'
            ],
            DimensionAttributes : [
                {
                    Dimension : 'MaintOrdProcessPhaseCode',
                    Role      : #Category
                },
                {
                    Dimension : 'MaintenanceOrderType',
                    Role      : #Series
                }
            ],
            Measures            : ['Counter'],
            MeasureAttributes   : [{
                Measure : 'Counter',
                Role    : #Axis1
            }]
        }
    }
);

annotate CatalogService.MaintenanceOrderAnalytics with {
    @Analytics.Dimension : true
    MaintPriority @(title : '{i18n>MaintPriority}');
    @Analytics.Dimension : true
    MaintOrdProcessPhaseCode @(title : '{i18n>MaintOrdProcessPhaseCode}');
    @Analytics.Dimension : true
    MaintenanceOrderType     @(title : '{i18n>MaintenanceOrderType}');
    @Analytics.Measure   : true
    @Aggregation.default         : #SUM
    @Core.Computed
    Counter                  @(title : '{i18n>Counter}');
}
