import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../modules/service/bridge.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotiferService } from '../modules/service/helpers/notifer.service';

@Component({
  selector: 'app-genreated-reports',
  templateUrl: './genreated-reports.component.html',
  styleUrls: ['./genreated-reports.component.scss']
})
export class GenreatedReportsComponent implements OnInit {

  reportsData: any[] = [];
  closeResult = '';
  constructor(private bridgeService2: BridgeService,private modalService: NgbModal,private _NotifierService: NotiferService,) { }

  ngOnInit(): void {
    // this.getReports();
  }


  // getReports(): void {
  //   this.bridgeService2.getReportList().subscribe(
  //     (response: any) => {
  //       this.reportsData = response.data; 
  //       console.log("Reports Data: ", this.reportsData); 
  //     },
  //     (error: any) => {
  //       console.error('Error fetching report list', error);
  //     }
  //   );
    
  // }
  
  // getModuleName(moduleName: string): string {
  //   if (moduleName) {
  //     // Split the string at '.' and get the last part
  //     let part = moduleName.split('.').pop() || '';
  //     // Remove the last two characters
  //     return part.slice(0, -2);
  //   }
  //   return '';
  // }

  CanelID: any;
  CanelOrderPopup(confirmModal:any,id: number) {
   this.modalService.open(confirmModal, { ariaLabelledBy: 'modal-basic-title',backdrop: 'static', modalDialogClass: 'confirm-modal modal-dialog-centered' })
   .result.then(
     (result) => {
       this.closeResult = `Closed with: ${result}`;
     },
     (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     }
   );
   this.CanelID = id;
 }
  cancelOrder(id:any){
      this.bridgeService2.deletereport(id).subscribe(
        (res: any) => {
          if (Object(res)['status'] == "200") {
            this.modalService.dismissAll();
            this.ngOnInit();
            // this.RowPerPage();
          }
          else {
            this._NotifierService.showError(Object(res)['message']);
          }
        },
        (err) => {
          const delim = ":"
          const name = err.message
          const result = name.split(delim).slice(3).join(delim)
          this._NotifierService.showError(result);
        }
      );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

