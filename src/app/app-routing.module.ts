import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { AddOpportunityComponent } from './add-opportunity/add-opportunity.component';
import { OpportunityEditComponent } from './opportunity-edit/opportunity-edit.component';
import { OpportunityDetailsComponent } from './opportunity-details/opportunity-details.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { QuotationComponent } from './quotation/quotation.component';
import { QuotationAddComponent } from './quotation-add/quotation-add.component';
import { QuotationEditComponent } from './quotation-edit/quotation-edit.component';
import { QuotationDetailsComponent } from './quotation-details/quotation-details.component';
import { OrderComponent } from './order/order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ExpenseComponent } from './expense/expense.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';
import { TargetAssignedComponent } from './target-assigned/target-assigned.component';
import { TargetAssignedDetailsComponent } from './target-assigned-details/target-assigned-details.component';
import { SingleTargetAssignedDetailsComponent } from './single-target-assigned-details/single-target-assigned-details.component';
import { InventoryDetailsComponent } from './inventory-details/inventory-details.component';
import { InventoryComponent } from './inventory/inventory.component';
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
import { OpportunitytypeComponent } from './opportunitytype/opportunitytype.component';
import { CustomertypeComponent } from './customertype/customertype.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { MemberlistComponent } from './memberlist/memberlist.component';
import { PaymentmasterComponent } from './paymentmaster/paymentmaster.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { AddIndustryComponent } from './add-industry/add-industry.component';
import { CalendarComponent } from './calendar/calendar.component';
// import { LeadFollowupComponent } from './lead-followup/lead-followup.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignNameComponent } from './campaign-name/campaign-name.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { AddCampaignNameComponent } from './add-campaign-name/add-campaign-name.component';
import { CampaignNameDetailsComponent } from './campaign-name-details/campaign-name-details.component';
import { EditCompaignsetComponent } from './edit-compaignset/edit-compaignset.component';
import { EditCampaignNameComponent } from './edit-campaign-name/edit-campaign-name.component';
import { SmtpSettingComponent } from './smtp-setting/smtp-setting.component';
import { CampaignLeadComponent } from './campaign-lead/campaign-lead.component';
import { CampaignLeadListComponent } from './campaign-lead-list/campaign-lead-list.component';
import { UserlistdetailsComponent } from './userlistdetails/userlistdetails.component';
import { SplitComponent } from './leads/split/split.component';
import { KarbanComponent } from './leads/karban/karban.component';
import { ActivityshowComponent } from './leads/activityshow/activityshow.component';
import { NotificationComponent } from './notification/notification.component';
import { LocationShareComponent } from './location-share/location-share.component';
import { AddTargetAssignedComponent } from './add-target-assigned/add-target-assigned.component';
import { LocationTrackingComponent } from './location-tracking/location-tracking.component';
import { SingleLocationTrackingComponent } from './single-location-tracking/single-location-tracking.component';
import { JunkComponent } from './leads/junk/junk.component';
import { SingleLocationMapComponent } from './single-location-map/single-location-map.component';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';
import { OrderaddpreviewComponent } from './orderaddpreview/orderaddpreview.component';
import { PrivilegeComponent } from './privilege/privilege.component';
import { MasterLanguageComponent } from './master-language/master-language.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { ProjectmanagmentComponent } from './PMO/projectmanagment/projectmanagment.component';
import { ProjectDetailsComponent } from './PMO/project-details/project-details.component';
import { ZonemasterComponent } from './zonemaster/zonemaster.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { RolemasterComponent } from './rolemaster/rolemaster.component';
import { PaymentCollactionComponent } from './payment-collaction/payment-collaction.component';
import { ComBranchComponent } from './com-branch/com-branch.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { ConfirmAppComponent } from './confirm-app/confirm-app.component';
import { LocalSettingComponent } from './local-setting/local-setting.component';
import { ReportsComponent } from './reports/reports.component';
import { GenreatedReportsComponent } from './genreated-reports/genreated-reports.component';
import { InventoryNewComponent } from './inventory-new/inventory-new.component';
import { AccessModulesComponent } from './access-modules/access-modules.component';
import { AccessModulesListComponent } from './access-modules/access-modules-list/access-modules-list.component';
import { FieldManagementComponent } from './field-management/field-management.component';
import { WorkflowlistComponent } from './workflowlist/workflowlist.component';
import { AddEditWorkflowComponent } from './workflowlist/add-edit-workflow/add-edit-workflow.component';
import { CompetitorsComponent } from './competitors/competitors.component';
import { CompetitorsDetailsComponent } from './competitors-details/competitors-details.component';
import { DirectoryPartnerComponent } from './directory-partner/directory-partner.component';
import { DPDetailsComponent } from './dp-details/dp-details.component';
import { CustomerSegmentComponent } from './customer-segment/customer-segment.component';
import { CustomerSegmentMasterComponent } from './customer-segment-master/customer-segment-master.component';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { PriceListComponent } from './price-list/price-list.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmapp', component: ConfirmAppComponent },

  { path: 'employees', component: UserListComponent },
  { path: 'employees/employees-details/:id', component: UserlistdetailsComponent },
  // { path: 'leads', component: ExcelsheetComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'opportunity', component: OpportunityComponent },
  { path: 'opportunity/add-opportunity', component: AddOpportunityComponent },
  { path: 'opportunity/edit-opportunity/:id', component: OpportunityEditComponent },
  { path: 'opportunity/opportunity-details/:id', component: OpportunityDetailsComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/add-customer', component: CustomerAddComponent },
  { path: 'customer/customer-details/:id', component: CustomerDetailsComponent },
  { path: 'customer/edit-customer/:id', component: CustomerEditComponent },
  { path: 'quotation', component: QuotationComponent },
  { path: 'quotation/add-quotation', component: QuotationAddComponent },
  { path: 'quotation/edit-quotation/:id', component: QuotationEditComponent },
  { path: 'quotation/quotation-details/:id', component: QuotationDetailsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/add-order', component: OrderAddComponent },
  { path: 'order/add-order/:id', component: OrderAddComponent },
  { path: 'invoice/add-invoice', component: InvoiceAddComponent },
  { path: 'invoice/add-invoice/:id', component: InvoiceAddComponent },

  { path: 'order/add-order-preview', component:OrderaddpreviewComponent},
  { path: 'order/order-details/:id', component: OrderDetailsComponent },
  // { path: 'order/edit-order/:id', component: OrderEditComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice/invoice-details/:id', component: InvoiceDetailsComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'delivery/delivery-details/:id', component: DeliveryDetailsComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'target-assisment/add-target-assisment', component: AddTargetAssignedComponent },
  { path: 'target-assisment', component: TargetAssignedComponent },
  { path: 'target-assisment/target-assisment-details/:id', component: TargetAssignedDetailsComponent },
  { path: 'Consumables', component: SingleTargetAssignedDetailsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'product', component: ProductComponent },
  { path: 'inventory/item/:id', component: InventoryDataComponent },
  { path: 'newinventory/:id/:catId', component: InventoryNewComponent },
  { path: 'inventory/details/:id', component: InventoryDetailsComponent },
  { path: 'lead/dashboard', component: LeadDashboardComponent },
  { path: 'lead/Campaign', component: LeadCampaignComponent },
  { path: 'lead/Refrence', component: LeadRefrenceComponent },
  { path: 'lead/Event', component: LeadEventComponent },
  { path: 'lead/campaign-details/:id', component: LeadCampaignDetailsComponent },
  { path: 'lead/history/:id', component: LeadCampaignFollowupComponent },
  { path: 'lead/Create', component: LeadCreateComponent },
  { path: 'industry', component: IndustryComponent },
  { path: 'opportunitytype', component: OpportunitytypeComponent },
  { path: 'customertype', component: CustomertypeComponent },
  { path: 'leads/linkedin', component: LinkedinComponent },
  { path: 'add-industry', component: CustomertypeComponent },
  { path: 'paymentmaster', component: PaymentmasterComponent },
  { path: 'payment-details', component: PaymentTermsComponent },
  { path: 'campaign/details/memberlist/:id', component: MemberlistComponent },
  { path: 'calendar', component: CalendarComponent },
  // {path : 'calendar', component:LeadFollowupComponent}
  { path: 'facebook-campaign', component: CampaignLeadComponent },
  { path: 'campaign-lead-list', component: CampaignLeadListComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'campaign/details/campaign-name/:id', component: CampaignNameComponent },
  { path: 'campaign/add-campaign', component: AddCampaignComponent },
  { path: 'campaign/details/:id', component: CampaignDetailsComponent },
  { path: 'campaign/details/campaign-name/add-campaign-name/:id', component: AddCampaignNameComponent },
  { path: 'campaign/details/campaign-name/campaign-name-details/:id', component: CampaignNameDetailsComponent },
  { path: 'campaign/edit-compaignset/:id', component: EditCompaignsetComponent },
  { path: 'campaign/details/campaign-name/edit-campaign-name/:id', component: EditCampaignNameComponent },
  { path: 'smtp-setting', component: SmtpSettingComponent },
  { path: 'leads/table/lead-details/:id', component: LeadDetailsComponent },
  { path: 'leads/junk/lead-details/:id', component: LeadDetailsComponent },
  { path: 'leads/junk', component: JunkComponent },
  { path: 'leads/table', component: ExcelsheetComponent },
  { path: 'leads/split', component: SplitComponent },
  { path: 'leads/karban', component: KarbanComponent },
  { path: 'leads/activityshow', component: ActivityshowComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'locationshare', component: LocationShareComponent },
  { path: 'locationTracking', component: LocationTrackingComponent },
  { path: 'locationMap/one/:id', component: SingleLocationMapComponent },
  { path: 'Mylocationlocation/one/:id', component: SingleLocationTrackingComponent },
  {path:'superadmindashboard', component:SuperadmindashboardComponent},
  {path:'privilege',component:PrivilegeComponent},
  {path:'language',component:MasterLanguageComponent},
  {path:'videos',component:VideoGalleryComponent},
  {path:'projectmanagment',component:ProjectmanagmentComponent},
  {path:'projectmanagment/ProjectDetails',component:ProjectDetailsComponent},
  {path:'zonemaster',component:ZonemasterComponent},
  {path:'rolemaster',component:RolemasterComponent},
  {path:'departmentmaster',component:DepartmentmasterComponent},
  {path:'payment-collection',component:PaymentCollactionComponent},
  {path:'company-branch',component:ComBranchComponent},
  {path:'local-setting',component:LocalSettingComponent},
  {path:'reports',component:ReportsComponent},
  {path:'generatereports',component:GenreatedReportsComponent},
  {path:'access-modules',component:AccessModulesComponent},
  {path:'access-modules-list/:id',component:AccessModulesListComponent},
  {path:'field-management',component:FieldManagementComponent},
  {path:'workflow',component:WorkflowlistComponent},
  {path:'workflow/addEdit/:id',component:AddEditWorkflowComponent},
  {path:'competitors',component:CompetitorsComponent},

  { path: 'competitors/competitors-details/:id', component: CompetitorsDetailsComponent },
  {path:'directory-partner/dp-details/:id',component:DPDetailsComponent},
  {path:'Directory-Partner',component:DirectoryPartnerComponent},
  {path:'customer-segment',component:CustomerSegmentMasterComponent},
  {path:'project-type',component:ProjectTypeComponent},
  {path:'price-list',component:PriceListComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
