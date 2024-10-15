// import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';
// import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
// import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
// import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
// import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
// import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { KanbanAllModule } from '@syncfusion/ej2-angular-kanban';
// import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchfilterleadPipe } from './searchfilterlead.pipe';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { AddOpportunityComponent } from './add-opportunity/add-opportunity.component';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { OpposearchfilterPipe } from './opposearchfilter.pipe';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationAddComponent } from './quotation-add/quotation-add.component';
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { QuotationPipe } from './quotation.pipe';
import { CustomerfilterPipe } from './customerfilter.pipe';
import { OrderComponent } from './order/order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderfilterPipe } from './orderfilter.pipe';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { TargetAssignedComponent } from './target-assigned/target-assigned.component';
import { TargetAssignedDetailsComponent } from './target-assigned-details/target-assigned-details.component';
import { SingleTargetAssignedDetailsComponent } from './single-target-assigned-details/single-target-assigned-details.component';
import { DeliveryFilterPipe } from './delivery-filter.pipe';
import { InventoryComponent } from './inventory/inventory.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { LeadDashboardComponent } from './lead-dashboard/lead-dashboard.component';
import { LeadCampaignComponent } from './lead-campaign/lead-campaign.component';
import { LeadRefrenceComponent } from './lead-refrence/lead-refrence.component';
import { LeadEventComponent } from './lead-event/lead-event.component';
import { LeadCampaignDetailsComponent } from './lead-campaign-details/lead-campaign-details.component';
import { LeadCampaignFollowupComponent } from './lead-campaign-followup/lead-campaign-followup.component';
import { LeadCreateComponent } from './lead-create/lead-create.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductComponent } from './product/product.component';
import { InventoryDataComponent } from './inventory-data/inventory-data.component';
import { IndustryComponent } from './industry/industry.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { AddIndustryComponent } from './add-industry/add-industry.component';
import { CalendarComponent } from './calendar/calendar.component';
import { IndussearchfilterPipe } from './indussearchfilter.pipe';
import { PaymentfilterPipe } from './paymentfilter.pipe';
import { InvendataPipe } from './invendata.pipe';
import { SortEmployeePipe } from './sort-employee.pipe';
import { LeadtypefilterPipe } from './leadtypefilter.pipe';
import { LeadstatusfilterPipe } from './leadstatusfilter.pipe';
import { LeadcatefilterPipe } from './leadcatefilter.pipe';
import { CampaignComponent } from './campaign/campaign.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { AddCampaignNameComponent } from './add-campaign-name/add-campaign-name.component';
import { CampaignNameDetailsComponent } from './campaign-name-details/campaign-name-details.component';
import { CampaignNameComponent } from './campaign-name/campaign-name.component';
import { EmployeefilterPipe } from './employeefilter.pipe';
import { Customerfilter1Pipe } from './customerfilter1.pipe';
import { OpportunityfilterPipe } from './opportunityfilter.pipe';
import { QuotationfilterPipe } from './quotationfilter.pipe';
import { Orderfilter1Pipe } from './orderfilter1.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OpportunitytypeComponent } from './opportunitytype/opportunitytype.component';
import { CustomertypeComponent } from './customertype/customertype.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { CampsetPipe } from './campset.pipe';
import { CampsetFilterPipe } from './campset-filter.pipe';
import { CampaignnamePipe } from './campaignname.pipe';
import { MemberlistPipe } from './memberlist.pipe';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { EditCompaignsetComponent } from './edit-compaignset/edit-compaignset.component';
import { EditCampaignNameComponent } from './edit-campaign-name/edit-campaign-name.component';
import { SmtpSettingComponent } from './smtp-setting/smtp-setting.component';
import { SmtpfilterPipe } from './smtpfilter.pipe';
import { CampaignLeadComponent } from './campaign-lead/campaign-lead.component';
import { CampaignLeadListComponent } from './campaign-lead-list/campaign-lead-list.component';
import { InventorysearchfilterPipe } from './inventorysearchfilter.pipe';
import { QuotationsearchfilterPipe } from './quotationsearchfilter.pipe';
import { CustomertypeFilterPipe } from './customertype-filter.pipe';
import { IconsPipe } from './modules/pipes/icons.pipe';
import { BusinesspipePipe } from './businesspipe.pipe';
import { UserlistdetailsComponent } from './userlistdetails/userlistdetails.component';
import { EmployeefilterPipe1Pipe } from './employeefilter-pipe1.pipe';
import { CustomDateParserFormatter } from './modules/service/custom-date-parser-formatter.service';
import { NgbDatapickerValueFormatterService } from './modules/service/ngb-datapicker-value-formatter.service';
import { SplitComponent } from './leads/split/split.component';
import { KarbanComponent } from './leads/karban/karban.component';
import { PhoneComponent } from './phone/phone.component';
import { LeadpriorityPipe } from './leadpriority.pipe';
import { KeyboardKeyDirective } from './keyboard-key.directive';
import { ContactComponent } from './contact/contact.component';
import { OskInputDirective } from './osk-input.directive';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyboardService } from './keyboard.service';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { BelluserComponent } from './belluser/belluser.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { PaymentmasterComponent } from './paymentmaster/paymentmaster.component';
import { ExpenseComponent } from './expense/expense.component';
import { LocationShareComponent } from './location-share/location-share.component';
import { NgxGoogleMapHelperModule } from 'ngx-google-map-helper';
import { AddTargetAssignedComponent } from './add-target-assigned/add-target-assigned.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { SingleLocationTrackingComponent } from './single-location-tracking/single-location-tracking.component';
import { DropdownModule } from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import { JunkComponent } from './leads/junk/junk.component';
import { InventoryfilterPipe } from './inventoryfilter.pipe';
import { TrackingLocationPipe } from './tracking-location.pipe';
import { PaymentdetailsPipe } from './paymentdetails.pipe';
import { ExpenseSearchPipe } from './expense-search.pipe';
import { SingleLocationMapComponent } from './single-location-map/single-location-map.component';
import { AgmCoreModule } from '@agm/core';
import { TargetassismentsearchPipe } from './targetassismentsearch.pipe';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { NetworkDetectorDirective } from './modules/directives/network-detector.directive';
import { LeftMenuNavbarDirective } from './modules/directives/left-menu-navbar.directive';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';
import { OrderaddpreviewComponent } from './orderaddpreview/orderaddpreview.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PrivilegeComponent } from './privilege/privilege.component';
import { MasterLanguageComponent } from './master-language/master-language.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { HeaderComponent } from './header/header.component';
import { ProjectmanagmentComponent } from './PMO/projectmanagment/projectmanagment.component';
import { ProjectDetailsComponent } from './PMO/project-details/project-details.component';
import { ZonemasterComponent } from './zonemaster/zonemaster.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { ActivityshowComponent } from './leads/activityshow/activityshow.component';
import { ToastrModule } from 'ngx-toastr';
import { PriceFormatPipe } from './price-format.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { PaymentCollactionComponent } from './payment-collaction/payment-collaction.component';
import { ComBranchComponent } from './com-branch/com-branch.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { ConfirmAppComponent } from './confirm-app/confirm-app.component';
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { LocalSettingComponent } from './local-setting/local-setting.component';
import { ReportsComponent } from './reports/reports.component';
import { InventoryNewComponent } from './inventory-new/inventory-new.component';
import { AccessModulesComponent } from './access-modules/access-modules.component';
import { AccessModulesListComponent } from './access-modules/access-modules-list/access-modules-list.component';
import { GenreatedReportsComponent } from './genreated-reports/genreated-reports.component';
import { FieldManagementComponent } from './field-management/field-management.component';
import { WorkflowlistComponent } from './workflowlist/workflowlist.component';
import { AddEditWorkflowComponent } from './workflowlist/add-edit-workflow/add-edit-workflow.component';
import { CompetitorsComponent } from './competitors/competitors.component';
import { CompetitorsDetailsComponent } from './competitors-details/competitors-details.component';
import { DirectoryPartnerComponent } from './directory-partner/directory-partner.component';
import { CustomerSegmentMasterComponent } from './customer-segment-master/customer-segment-master.component';
import { DPDetailsComponent } from './dp-details/dp-details.component';
import { CustomerSegmentComponent } from './customer-segment/customer-segment.component';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { PriceListComponent } from './price-list/price-list.component';
import { BPCatalogComponent } from './bp-catalog/bp-catalog.component';
import { ComptitorQuotationComponent } from './comptitor-quotation/comptitor-quotation.component';
import { AddeditcomptitorquotationComponent } from './comptitor-quotation/addeditcomptitorquotation/addeditcomptitorquotation.component';


// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { LeadFollowupComponent } from './lead-followup/lead-followup.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    ExcelsheetComponent,
    SearchfilterPipe,
    DashboardComponent,
    SearchfilterleadPipe,
    LeftMenuComponent,
    OpportunityComponent,
    AddOpportunityComponent,
    OpportunityEditComponent,
    OpportunityDetailsComponent,
    OpposearchfilterPipe,
    CustomerComponent,
    CustomerAddComponent,
    CustomerDetailsComponent,
    CustomerEditComponent,
    QuotationComponent,
    QuotationAddComponent,
    QuotationEditComponent,
    QuotationDetailsComponent,
    QuotationPipe,
    CustomerfilterPipe,
    OrderComponent,
    OrderAddComponent,
    OrderDetailsComponent,
    OrderEditComponent,
    OrderfilterPipe,
    InvoiceComponent,
    InvoiceDetailsComponent,
    DeliveryComponent,
    DeliveryDetailsComponent,
    TargetAssignedComponent,
    TargetAssignedDetailsComponent,
    SingleTargetAssignedDetailsComponent,
    DeliveryFilterPipe,
    InventoryComponent,
    LeadDetailsComponent,
    InventoryDetailsComponent,
    LeadDashboardComponent,
    LeadCampaignComponent,
    LeadRefrenceComponent,
    LeadEventComponent,
    LeadCampaignDetailsComponent,
    LeadCampaignFollowupComponent,
    LeadCreateComponent,
    WarehouseComponent,
    ProductComponent,
    InventoryDataComponent,
    IndustryComponent,
    PaymentTermsComponent,
    AddIndustryComponent,
    CalendarComponent,
    IndussearchfilterPipe,
    PaymentfilterPipe,
    InvendataPipe,
    SortEmployeePipe,
    LeadtypefilterPipe,
    LeadstatusfilterPipe,
    LeadcatefilterPipe,
    CampaignComponent,
    AddCampaignComponent,
    CampaignDetailsComponent,
    AddCampaignNameComponent,
    CampaignNameDetailsComponent,
    CampaignNameComponent,
    EmployeefilterPipe,
    Customerfilter1Pipe,
    OpportunityfilterPipe,
    QuotationfilterPipe,
    Orderfilter1Pipe,
    OpportunitytypeComponent,
    CustomertypeComponent,
    MemberlistComponent,
    CampsetPipe,
    CampsetFilterPipe,
    CampaignnamePipe,
    MemberlistPipe,
    EditCompaignsetComponent,
    EditCampaignNameComponent,
    SmtpSettingComponent,
    SmtpfilterPipe,
    CampaignLeadComponent,
    CampaignLeadListComponent,
    InventorysearchfilterPipe,
    QuotationsearchfilterPipe,
    CustomertypeFilterPipe,
    IconsPipe,
    BusinesspipePipe,
    UserlistdetailsComponent,
    EmployeefilterPipe1Pipe,
     SplitComponent,
    KarbanComponent,
    KeyboardComponent,
    OskInputDirective,
    KeyboardKeyDirective,
    PhoneComponent,
    ContactComponent,
    LeadpriorityPipe,
    NotificationComponent,
    BelluserComponent,
    LinkedinComponent,
    PaymentmasterComponent,
    ExpenseComponent,
    LocationShareComponent,
    AddTargetAssignedComponent,
    LocationTrackingComponent,
    SingleLocationTrackingComponent,
    JunkComponent,
    InventoryfilterPipe,
    TrackingLocationPipe,
    PaymentdetailsPipe,
    ExpenseSearchPipe,
    SingleLocationMapComponent,
    TargetassismentsearchPipe,
    //NetworkDetectorDirective,
    LeftMenuNavbarDirective,
    SuperadmindashboardComponent,
    OrderaddpreviewComponent,
    PrivilegeComponent,
    MasterLanguageComponent,
    IconsPipe,
    VideoGalleryComponent,
    HeaderComponent,
    ProjectmanagmentComponent,
    ProjectDetailsComponent,
    ZonemasterComponent,
    RolemasterComponent,
    DepartmentmasterComponent,
    ActivityshowComponent,
    PriceFormatPipe,
    CustomDatePipe,
    PaymentCollactionComponent,
    ComBranchComponent,
    InvoiceAddComponent,
    ConfirmAppComponent,
    PreviewModalComponent,
    LocalSettingComponent,
    ReportsComponent,
    InventoryNewComponent,
    AccessModulesComponent,
    AccessModulesListComponent,
    GenreatedReportsComponent,
    FieldManagementComponent,
    AddEditWorkflowComponent,
    WorkflowlistComponent,
    CompetitorsComponent,
    CompetitorsDetailsComponent,
    DirectoryPartnerComponent,
    CustomerSegmentMasterComponent,
    DPDetailsComponent,
    CustomerSegmentComponent,
    ProjectTypeComponent,
    PriceListComponent,
    BPCatalogComponent,
    ComptitorQuotationComponent,
    AddeditcomptitorquotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    FullCalendarModule,
    NgSelectModule,
    ToastrModule.forRoot({
      maxOpened: 1
    }),
    InfiniteScrollModule,
    // NgOptionHighlightModule,
    NgMultiSelectDropDownModule,
    // NumericTextBoxAllModule,
    // TabAllModule,
    // GridAllModule,
    // DialogAllModule,
    // DatePickerAllModule,
    // DropDownListModule,
    // AutoCompleteAllModule,
    KanbanAllModule,
    NgxGoogleMapHelperModule.forRoot({
      apiKey: 'AIzaSyAM78AABQYPG-dmQ0qTlxSkzwnBALLqOJU',
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAM78AABQYPG-dmQ0qTlxSkzwnBALLqOJU',
      libraries: ['places']
    }),
    MultiSelectModule,
    DropdownModule,

  ],
  providers: [KeyboardService,CustomDateParserFormatter,DatePipe,{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
