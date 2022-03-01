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
                    Role      : #Category
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
    @AnalyticalContext.Dimension : true
    MaintOrdProcessPhaseCode @(title : '{i18n>MaintOrdProcessPhaseCode}');
    @AnalyticalContext.Dimension : true
    MaintenanceOrderType     @(title : '{i18n>MaintenanceOrderType}');
    @AnalyticalContext.Measure   : true
    @Aggregation.default         : #COUNTDISTINCT
    @Core.Computed
    Counter                  @(title : '{i18n>Counter}');
}
