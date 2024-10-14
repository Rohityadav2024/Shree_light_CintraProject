import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-orderaddpreview',
  templateUrl: './orderaddpreview.component.html',
  styleUrls: ['./orderaddpreview.component.scss']
})
export class OrderaddpreviewComponent implements OnInit {
previewData:any;
urlcheck :any;
// CountItem: Number = 0;
  total_Amount:any;
  constructor(private bridgeService2: BridgeService,
    private router: Router,) { }

  ngOnInit(): void {
    var priviousUrl = this.bridgeService2.getPreviousUrl();
    this.urlcheck = priviousUrl.split('/');
    var totalamount=new Array;
    if (this.urlcheck[1] == 'order') {
      this.previewData =this.bridgeService2.getOrderpreview();


      for (let i = 0; i < this.previewData.DocumentLines.length; i++) {
      var total=Math.round((this.previewData.DocumentLines[i].Quantity * this.previewData.DocumentLines[i].UnitPrice - (this.previewData.DocumentLines[i].DiscountPercent/100))- ((this.previewData.DocumentLines[i].Quantity * this.previewData.DocumentLines[i].UnitPrice - (this.previewData.DocumentLines[i].DiscountPercent/100)) * this.previewData.DiscountPercent/100));
        totalamount.push(total);
      }

      this.total_Amount=totalamount.reduce((a:any, b:any) => a + Number(b), 0);
      console.log('this is preview data',this.previewData)
      console.log('total-Amount-->',this.total_Amount)
    }

  }

  orderback(data:any){
    this.bridgeService2.orderback([data]);
    this.router.navigate(['/order/add-order']);
  }

}
