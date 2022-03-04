using {CatalogService} from './cat-service';

annotate CatalogService.MaintenanceOrderAnalytics with @(
    Aggregation : {ApplySupported : {PropertyRestrictions : true}},
    UI          : {
        SelectionFields             : [
            MaintOrderReferenceDate,
            MaintenanceOrderType,
            MaintPriority,
            MaintenancePlanningPlant,
            MaintOrdProcessPhaseCode,
            MaintenancePhaseControl
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
        },
        PresentationVariant #Chart2 : {Visualizations : ['@UI.Chart#PriorityByOrderType']},
        Chart #PriorityByOrderType  : {
            ChartType           : #ColumnStacked,
            Dimensions          : [
                'MaintPriority',
                'MaintenanceOrderType'
            ],
            DimensionAttributes : [
                {
                    Dimension : 'MaintPriority',
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

annotate CatalogService.MaintenanceOrderAgeAnalytics with @(
    Aggregation : {ApplySupported : {PropertyRestrictions : true}},
    UI          : {
        PresentationVariant #Chart1 : {Visualizations : ['@UI.Chart#CompleteionDateByOrderType']},
        Chart #CompleteionDateByOrderType : {
            ChartType           : #Column,
            Dimensions          : [
                'CompletionDateDim',
                'MaintenanceOrderType'
            ],
            DimensionAttributes : [
                {
                    Dimension : 'CompletionDateDim',
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
    MaintPriority            @(title : '{i18n>MaintPriority}');
    @Analytics.Dimension : true
    MaintOrdProcessPhaseCode @(title : '{i18n>MaintOrdProcessPhaseCode}');
    @Analytics.Dimension : true
    MaintenanceOrderType     @(title : '{i18n>MaintenanceOrderType}');
    @Consumption.filter.selectionType: #INTERVAL
    MaintOrderReferenceDate @(title : '{i18n>MaintOrderReferenceDate}');
    @Analytics.Measure   : true
    @Aggregation.default : #SUM
    @Core.Computed
    Counter                  @(title : '{i18n>Counter}');
}

annotate CatalogService.MaintenanceOrderAgeAnalytics with {
    @Analytics.Dimension : true
    MaintenanceOrderType @(title : '{i18n>MaintenanceOrderType}');
    @Analytics.Dimension : true
    CompletionDateDim    @(title : '{i18n>CompletionDateDim}');
    CalendarYear;
    CalendarMonth;
    @Analytics.Measure   : true
    @Aggregation.default : #SUM
    Counter              @(title : '{i18n>Counter}');
}

// annotate CatalogService.MaintenanceOrderAgeAnalytics with @(
//     Aggregation.ApplySupported : {
//         Transformations          : [
//             'aggregate',
//             'topcount',
//             'bottomcount',
//             'identity',
//             'concat',
//             'groupby',
//             'filter',
//             'expand',
//             'top',
//             'skip',
//             'orderby',
//             'search'
//         ],
//         Rollup                   : #None,
//         GroupableProperties : [
//             CompletionDateDim,
//             LatestAcceptableCompletionDate,
//             CalendarWeek,
//             CalendarYear
//         ],
//         AggregatableProperties : [
//             {Property : Counter},
//         ],
//     }
// );
