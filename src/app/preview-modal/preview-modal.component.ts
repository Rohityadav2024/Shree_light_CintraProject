import { Component, Input, OnInit,Renderer2  } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {
  @Input() GetPopupData: any[]=[];
  isEdit:boolean=false;
  TypeOfPop:any;
  childData:any;
  replaceNone(val:any) {
    var valData = ''
    if (val == 'None') {
      valData = '';
    }
    else {
      valData = val + " ";
    }
    return valData
  }

  replaceNoneWithComma(val:any) {
    var valData = ''
    if (val == 'None') {
      valData = '';
    }
    else {
      valData = val + " ";
    }
    return valData

  }

  checkBillingCity(val:any, val2?:any) {
    var valData = ''
    if (val != 'None') {
      valData = val + " ";
    }
    else if (val2 != 'None') {
      valData = val2 + " ";
    }
    else {
      valData = '';
    }

    return valData
  }
  constructor(private bridgeService: BridgeService,private renderer: Renderer2) { }

  ngOnInit(): void {
    // console.log(this.GetPopupData)
    this.childData = this.GetPopupData[0];
    this.isEdit = this.GetPopupData[1];
    this.TypeOfPop = this.GetPopupData[2];
    // console.log(this.childData)
    this.populateData(this.childData)
  }
  ourBranchContent:any = '...';
  BPLName:any = "...";
  FederalTaxID:any = "...";
  MobilePhone:any = "...";
  SalesEmployeeName:any = "...";
  BillToStreet:any = "...";
  ShipToStreet:any = "...";
  PaymentTermsGroupName:any = "...";
  fianllindtotal: number = 0;
  total_after: number = 0;
  total_after_tax: number = 0;
  tax_Value: number = 0;
  total_Amount: number = 0;
  totalamount: any[] = [];
  populateData(data: any) {
    if(data.AddressExtension.length != 0){
      this.BillToStreet =
        this.replaceNoneWithComma(data.AddressExtension.BillToStreet) +
        this.replaceNone(data.AddressExtension.BillToCity) +
        this.checkBillingCity(data.AddressExtension.U_BSTATE) +
        this.replaceNone(data.AddressExtension.U_BCOUNTRY) +
        this.replaceNone(data.AddressExtension.BillToZipCode);

        this.ShipToStreet =
        this.replaceNoneWithComma(data.AddressExtension.ShipToStreet) +
        this.replaceNone(data.AddressExtension.ShipToCity) +
        this.checkBillingCity(data.AddressExtension.U_SSTATE) +
        this.replaceNone(data.AddressExtension.U_BCOUNTRY) +
        this.replaceNone(data.AddressExtension.ShipToZipCode);
    }

    if(data.DocumentLines.length != 0){
      data.DocumentLines.forEach((val: any, key: any) => {
        this.fianllindtotal += Number(val.UnitPrice*val.Quantity);

        var basic = Number(val.Quantity) * Number(val.UnitPrice);
      var afterfdis = basic - (basic * (Number(val.DiscountPercent) / 100))
      var aftersdis = afterfdis - (afterfdis * (Number(data.DiscountPercent) / 100))
        var total = aftersdis + (aftersdis * (Number(val.Tax) / 100));
      // totalamount += Number(total);
      this.total_after += afterfdis;
      this.total_after_tax += aftersdis;
      this.tax_Value +=  (aftersdis * (Number(val.Tax) / 100));
      });
      this.total_Amount = Number(this.total_after_tax)+Number(this.tax_Value);
      if(data.FreightCharge != ''){
        this.total_Amount = Number(this.total_Amount) + Number(data.FreightCharge)
      }
    }
    if (data.PaymentGroupCode != '') {
      this.bridgeService.getPaymentTermsOnedata(data.PaymentGroupCode).subscribe(
        (PaymentGroupCodeDetails: any) => {
          this.PaymentTermsGroupName = PaymentGroupCodeDetails[0].PaymentTermsGroupName;
        });
      }

    if (data.ContactPersonCode != '') {
    this.bridgeService.getContactPersoneone(data.ContactPersonCode).subscribe(
      (contactPersoneUpdate: any) => {
        this.MobilePhone = contactPersoneUpdate[0].MobilePhone;
      });
    }
    if (data.SalesPersonCode != '') {
      this.bridgeService.getoneemployee(data.SalesPersonCode).subscribe(
        (SalesPersonCodeDetails: any) => {
          this.SalesEmployeeName = SalesPersonCodeDetails[0].SalesEmployeeName;
        });
      }

    if (data.BPLID != '') {
    this.bridgeService.OneBranchMaster(data.BPLID).subscribe(
      (Client: any) => {
        this.BPLName = Client.data[0].BPLName;
        this.FederalTaxID = Client.data[0].FederalTaxID;
        this.ourBranchContent =
        this.replaceNoneWithComma(Client.data[0].Building) +
        this.replaceNone(Client.data[0].City) +
        this.checkBillingCity(Client.data[0].State) +
        this.replaceNone(Client.data[0].Country) +
        this.replaceNone(Client.data[0].ZipCode);

  },
  (err) => {
    console.log(err);
  }
);
  }


  }

}
