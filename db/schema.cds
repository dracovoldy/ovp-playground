namespace com.analytics.pm;

using {managed} from '@sap/cds/common';
using {API_MAINTENANCEORDER as maintorderext} from '../srv/external/API_MAINTENANCEORDER.csn';
using {ZZ1_CALENDARDATE_CDS as caldateext} from '../srv/external/ZZ1_CALENDARDATE_CDS.csn';
using {ZZ1_SYSTEMUSERCHANGEDOCS_CDS as changedocsext} from '../srv/external/ZZ1_SYSTEMUSERCHANGEDOCS_CDS.csn';

entity MaintenanceOrder       as
    select from maintorderext.MaintenanceOrder {
        key MaintenanceOrder,
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
            MaintOrderReferenceDate,
            to_MaintenanceOrderPhaseControl.MaintenancePhaseControl,
            1 as Counter : Integer,
    };

entity MaintOrderCalendarDate as
    select from maintorderext.MaintenanceOrder as A
    // left join caldateext.ZZ1_CALENDARDATE as B
    //     on A.LatestAcceptableCompletionDate = B.CalendarDate
    {
        key MaintenanceOrder,
            LatestAcceptableCompletionDate,
            MaintenanceOrderType,
            MaintOrderReferenceDate,
            virtual '' as CalendarYear: String(4),
            virtual '' as CalendarMonth: String(2),
            virtual '' as CalendarWeek: String(2),
            virtual null as CalendarDate: DateTime,
            virtual null as CompletionDateDim: String(7),
            virtual 1 as Counter : Integer
    };

entity MaintOrderChangeDocs as
    select from maintorderext.MaintenanceOrder {
        key MaintenanceOrder,
            MaintenanceOrderInternalID,
            MaintOrderReferenceDate,
            virtual '' as Bucket : String(10),
            virtual 1 as Counter : Integer
    };

// @mashup
// entity MaintenanceOrder : maintorderext.MaintenanceOrder {
//     key MaintenanceOrder             : String(12);
//         MaintenanceOrderType         : String(4);
//         MaintenanceOrderDesc         : String(40);
//         MaintOrdBasicStartDate       : DateTime;
//         MaintOrdBasicEndDate         : DateTime;
//         MaintenancePlanningPlant     : String(4);
//         MaintOrdProcessPhaseCode     : String(2);
//         MaintOrdProcessSubPhaseCode  : String(4);
//         MaintenanceOrderPlanningCode : String(1);
//         MaintenancePlannerGroup      : String(3);
//         MaintPriority                : String(1);
//         Counter                      : Integer default 1;
// }
