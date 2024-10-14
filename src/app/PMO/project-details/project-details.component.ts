import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardSettingsModel, DragEventArgs,ActionEventArgs,KanbanComponent  } from '@syncfusion/ej2-angular-kanban';
import { ProductItem } from 'src/app/modules/code/common-static.model';
declare var $: any;
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  // @ViewChild('KanbanA') kanbanObjA!: KanbanComponent;
  allowDragAndDrop: Boolean = false;
  filterLead: any = {};
  data: [][] | undefined;
  bridgess: any[] | any[] = [];
  commonObj : any={exportLoading:false}
  defaultleadtype: any;
  defaultleadstatus: any;
  defaultleadcat: any;
  dropdownSettings1 = {};
  dropdownList1: any = [];
  dropdownLead: any[] = [];
  dropdowncategory: any[] = [];
  AssigneddropdownList: any[] = [];
  sourcedropdownList: any[] = [];//for status
  UserId = sessionStorage.getItem('UserId');
  UserName: any;
  role: any;
  reportingTo: any;
  searchValue!: string;
  closeResult = '';
  followup: any[] = [];
  hold: any[] = [];
  New: any[] = [];
  Junk: any[] = [];
  Qualified: any[] = [];
  nodata: boolean = false;
  error = '';
  success = '';
  Weekdate: any;
  monthlydate: any;
  yearlydate: any;
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  //  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  newdate = this.day + "-" + this.month + "-" + this.year;

  inputElementTime = ("0" + this.dateObj.getHours()).slice(-2) + ":" + ("0" + this.dateObj.getMinutes()).slice(-2);
  exedate: any;
  execname: any;
  exeEemail: any;
  exelocation: any;
  exesource: any;
  exeremarks: any;
  exeproductinterest: any;
  exedesignation: any;
  exenoofemp: any;
  exeturnover: any;
  // UserId = sessionStorage.getItem('UserId');
  public selectedValue: any;
  public searchAssignValue: any;
  selectedName: any;
  findassaignName: any;
  public tereer: any[] = [];
  lead_id: any;
  baseUrl2: any;
  selectedData: any[] = [];

  iskanban: boolean = false;
  KanbanValue: any = 'tab';


  getValues(obj: {}) {
    return Object.values(obj)
  }

  newdatetime = this.newdate + " " + this.time;
  ProductItem: ProductItem = new ProductItem();
  constructor(private _location: Location, private bridgeService2: BridgeService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.getBridge();

    $(document).mouseup(function (e: { target: any; }) {
      var popup = $(".sidepanel");
      if((document.getElementById("mySidepanel") as HTMLInputElement) != null){
      if (!$('.openbtn').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
        $('#mySidepanel').removeClass('sidepanel2');
        $('#mySidepanel').addClass('mySidepanelGo');
      }
    }
    });
  }
  kanbanortab() {
    if (this.KanbanValue == 'tab') {
      this.iskanban = false;
    }
    else {
      this.iskanban = true;
    }
  }
  backClicked() {
    this._location.back();
  }
  LeadFoolwup: any[] = [];
  LeadFoolwupdata: any;
  mouseEnter() {
    $('.tableview').show();
    $('.shortview').hide();
  }
  mouseLeave() {
    $('.tableview').hide();

  }
  multipledropdownhide() {
    $('.tableview').hide();
    $('.shortview').hide();
  }
  mouseEntershortby() {
    $('.shortview').show();
    $('.tableview').hide();
  }
  mouseLeavetable() {
    $('.tableview').hide();
  }
  mouseLeaveshort() {
    $('.shortview').hide();
  }
  mouseLeaveMessage1(item: any) {
    $('.messageContainer1' + item.id).hide();
  }
  mouseEnterMessage1(item: any) {
    $('.messageContainer1' + item.id).show();
    this.LeadFoolwup = this.selectedData.filter((itemid: any) => itemid.id === item.id);
    this.LeadFoolwupdata = this.LeadFoolwup[0].message
    // console.log('-------------',this.LeadFoolwupdata);

  }
  mouseEnterMessage(item: any) {
    $('.messageContainer' + item.id).toggle();
    // this.LeadFoolwup=this.bridgess.filter((itemid:any)=>itemid.id===item.id);
    // console.log('------------1--------',this.LeadFoolwup);
  }

  onFileChange(evt: any) {

    const target: DataTransfer = <DataTransfer>(evt.target);
    // console.log("target", target)

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];



      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      // console.log("this.data", this.data)

      if (confirm("Are You Sure Do You Want To Import Data ?")) {
        var x: number[][] = this.data.slice(1);
        var excelupload = new Array();
        // console.log("excelupload", excelupload)
        let leng = x.length;
        for (let i = 0; i < leng; i++) {

          let y = x[i];
          let assto = '';
          if (y[0] == undefined) {
            // console.log("ifpart")
            this.exedate = ' ';
          }
          else {
            // console.log("elsepart")
            this.exedate = new Date((y[0] - (25567 + 2)) * 86400 * 1000);


            let m2 = this.exedate.getMonth() + 1;
            let month = (m2 < 10 ? '0' : '') + m2;
            let day = (this.exedate.getDate() < 10 ? '0' : '') + this.exedate.getDate();

            let year2 = this.exedate.getUTCFullYear();
            let newdate2 = year2 + "-" + month + "-" + day;
            if (newdate2 == "NaN-NaN-NaN") {
              this.exedate = y[0];
            }
            else {
              this.exedate = newdate2;
            }
            // console.log("newdate2",newdate2)
            y[0] = this.exedate;
          }


          if (y[2] == undefined) {
            this.execname = '';
          }
          else {
            this.execname = y[2];
          }

          if (y[3] == undefined) {
            this.exesource = '';
          }
          else {
            this.exesource = y[3];
          }

          if (y[6] == undefined) {
            this.exeremarks = '';
          }
          else {
            this.exeremarks = y[6];
          }

          if (y[8] == undefined) {
            this.exeproductinterest = '';
          }
          else {
            this.exeproductinterest = y[8];
          }

          if (y[9] == undefined) {
            this.exedesignation = '';
          }
          else {
            this.exedesignation = y[9];
          }
          if (y[10] == undefined) {
            this.exenoofemp = 0;
          }
          else {
            this.exenoofemp = y[10];
          }

          if (y[11] == undefined) {
            this.exeturnover = '';
          }
          else {
            this.exeturnover = y[11];
          }
          if (y[1] == undefined) {
            this.exelocation = '';
          }
          else {
            this.exelocation = y[1];
          }

          if (y[7] == undefined) {
            this.exeEemail = '';
          }
          else {
            this.exeEemail = y[7];
          }
          if (y[5] != undefined) {
            var empArray = {
              "date": this.exedate,
              "location": this.exelocation,
              "companyName": this.execname,
              "source": this.exesource,
              "contactPerson": y[4],
              "phoneNumber": y[5],
              "message": this.exeremarks,
              "email": this.exeEemail,
              "productInterest": this.exeproductinterest,
              "assignedTo": this.UserId,
              "employeeId": this.UserId,
              "timestamp": this.newdatetime,
              "designation": this.exedesignation,
              "numOfEmployee": this.exenoofemp,
              "turnover": this.exeturnover,
              "status": 'Follow Up',
              "leadType": '',
              "Attach": '',
              "Caption": ''

            };
            excelupload.push(empArray);
          }
        }

        this.bridgeService2.adduploadlead(excelupload).subscribe(
          (res: any) => {

            if (Object(res)['message'] == "successful") {
              alert('Data Imported Successfully');

              this.ngOnInit();
            }
            else {

              alert(Object(res)['message']);
            }
          });
      }
    };

    // this.isLoading = false;
    reader.readAsBinaryString(target.files[0]);
  }
  pagenumber: number = 1;
  leadCount: any;
  getBridge(): void {
    this.bridgeService2.getLeadCount().subscribe(
      (data: any) => {
        this.leadCount = data[0].lead_count;
        this.bridgeService2.getAll2(this.pagenumber, this.leadCount).subscribe(
          (data: any[]) => {

            this.bridgess = data;
            this.selectedData = data;
            console.log("this.selectedData", this.selectedData);

            this.followup = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Follow Up");
            this.hold = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Hold");
            this.New = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "New");
            // console.log(this.New);
            this.Junk = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Junk");
            this.Qualified = this.bridgess.filter(($statusfiletr: any) => $statusfiletr.status == "Qualified");
            // console.log(this.followup);



            for (let i = 0; i < this.bridgess.length; i++) {
              if (this.bridgess[i]['SalesEmployeeCode'] == '-1') {
                this.bridgess.splice(i, 1);
              }
              if (this.bridgess[i]['SalesEmployeeCode'] == '') {
                this.bridgess.splice(i, 1);
              }
            }
            if (this.bridgess.length <= 0) {
              this.nodata = true;
            }
            else {
              this.nodata = false;
            }
            // console.log(this.bridgess);

          },
          (err) => {
            console.log(err);
            this.error = err;
          }
        );
      });
  }
  exportexcel() {

    let element = document.getElementById('assigntable1');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet2');

    /* save to file */
    setTimeout(() => {
      XLSX.writeFile(wb, 'LeadExcelSheet.xlsx');

    }, 2000);




  }
  allLeads() {
    this.getBridge();

  }
  thisToday() {

    this.selectedData = this.bridgess.filter(($statud: any) => $statud.date == this.newdate);

  }

  thisWeek() {
    //   console.log(this.newdate);

    //  console.log(this.Weekdate);
    // this.selectedWeek = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.Weekdate
    //   );

    this.selectedData = this.bridgess.filter(
      m => m.date <= this.newdate && m.date >= this.Weekdate
    );
    // console.log(this.selectedData);

    // this.bridges2=this.selectedWeek;
  }

  thisMonth() {
    // console.log(this.newdate);
    // console.log(this.monthlydate)
    // this.selectedMonth = this.bridges2.sort((m:any,n:any) =>  m.date <= this.newdate && n.date >= this.monthlydate );
    // this.selectedMonth = this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.monthlydate
    //   );
    this.selectedData = this.bridgess.filter(
      m => m.date <= this.newdate && m.date >= this.monthlydate
    );
    // console.log(this.selectedData)
    //  this.bridges2=this.selectedMonth;

  }
  thisYear() {
    // console.log(this.newdate);
    // console.log(this.yearlydate)
    this.selectedData = this.bridgess.filter(
      m => m.date <= this.newdate && m.date >= this.yearlydate
    );
    // console.log(this.selectedData)
    // this.selectedYear =this.selectedYear.concat(this.bridges2.filter(
    //   m => m.date <= this.newdate && m.date >= this.yearlydate
    //   ));
  }
  searchEvent(name: any) {
    // console.log("changed", name.target.value);
    this.bridgeService2.pushSearch(name.target.value);
  }
   // kanban view
   public isExpanded: Boolean = false;

   public cardSettings: CardSettingsModel = {
     contentField: 'companyName',
     headerField: 'id'

   }
   onOpen(args:any) {
     // Preventing the modal dialog Open
     args.cancel = true;
   }
  onKanbanBDragStop(args: DragEventArgs) {
    // let kanbanAElement: Element = <Element>closest(args.event.target as Element, '#KanbanA');

    let data: any = args.data[0];
    data.assignedTo = data.assignedTo.id;
    data.employeeId = data.employeeId.id;
    this.bridgeService2.editleadstest(data).subscribe(
      (res: any) => {
        if (Object(res)['status'] == '200') {
          // alert('Success update');
        } else {
          alert(Object(res)['message']);
        }
      },
      (err) => {
        this.modalService.dismissAll();
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        alert(result);
        this.ngOnInit();
      }
    );
  }
  onItemSelect1(item: any) {
    // this.getBridge();
  }
  onSelectAll1(items: any) {
    // console.log(items)
    // this.getBridge();
  }
  public onDeSelectAll1(items: any) {
    // console.log(items);
    // this.getBridge();
  }

  onDeSelect1(items: any) {
    // console.log("ff", items)
    // this.getBridge();
  }
  openNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340px";
    (document.getElementById("mySidepanel") as HTMLInputElement).style.zIndex = "9";
    $('#mySidepanel').addClass('sidepanel2');
    $('#mySidepanel').removeClass('mySidepanelGo');
    $('.sidepanel').show();
  }

  closeNav() {
    (document.getElementById("mySidepanel") as HTMLInputElement).style.width = "340";
    $('#mySidepanel').removeClass('sidepanel2');
    $('#mySidepanel').addClass('mySidepanelGo');
  }



  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


// maximize and minimize popup here

openmaximize(content: any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: `modal-dialog-centered figma-cards-modal figma-cards-modal-lg` }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    }
  );
}

bigScreenOrMid() {
  if ((document.querySelector('.figma-cards-modal') as any).classList.contains('figma-cards-modal-lg')) {
    this.commonObj.bigScreenMode = true;
    (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-full');
    (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-lg');
  } else {
    this.commonObj.bigScreenMode = false;
    (document.querySelector('.figma-cards-modal') as any).classList.add('figma-cards-modal-lg');
    (document.querySelector('.figma-cards-modal') as any).classList.remove('figma-cards-modal-full');
  }
}
deleteid: number = 0;
deleteCustomer(id: number) {

  $('.delete-success-box').show();
  $('.hover-show').hide();
  this.deleteid = id;

  setTimeout(() => {
    $('.delete-success-box').fadeOut();
  }, 50000);
}

// maximize and minimize popup here



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  apply() {


    let filterLeadData: any = [];
    let assignedToData: any = [];
    let sourceToData: any = [];
    let leadgeneratedToData: any = [];
    let leadpriorityToData: any = [];





    if (!!this.filterLead.assignto2 && !!this.filterLead.source2 && !!this.filterLead.leadpriority2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {

      for (let y of this.filterLead.assignto2) {
        for (let a of this.filterLead.source2) {
          for (let b of this.filterLead.leadpriority2) {
            if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
              filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
                $data.assignedTo.firstName == y.item_text &&
                $data.source == a.item_text &&
                $data.leadType == b.item_text &&
                $data.date >= this.filterLead.leadgeneratedfrom
              ));
            }
          }
        }
      }
      this.selectedData = filterLeadData

    }

    // filter check

    else if (!!this.filterLead.assignto2 && !!this.filterLead.source2 && !!this.filterLead.leadpriority2) {
      for (let y of this.filterLead.assignto2) {
        for (let a of this.filterLead.source2) {
          for (let b of this.filterLead.leadpriority2) {
            filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
              $data.assignedTo.firstName == y.item_text &&
              $data.source == a.item_text &&
              $data.leadType == b.item_text
            ));
          }
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.assignto2 && !!this.filterLead.source2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let y of this.filterLead.assignto2) {
        for (let a of this.filterLead.source2) {
          if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
            filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
              $data.assignedTo.firstName == y.item_text &&
              $data.source == a.item_text &&
              $data.date >= this.filterLead.leadgeneratedfrom
            ));
          }
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.assignto2 && !!this.filterLead.leadpriority2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let y of this.filterLead.assignto2) {
        for (let b of this.filterLead.leadpriority2) {
          if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
            filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
              $data.assignedTo.firstName == y.item_text &&
              $data.leadType == b.item_text &&
              $data.date >= this.filterLead.leadgeneratedfrom
            ));
          }
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.source2 && !!this.filterLead.leadpriority2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let a of this.filterLead.source2) {
        for (let b of this.filterLead.leadpriority2) {
          if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
            filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
              $data.source == a.item_text &&
              $data.leadType == b.item_text &&
              $data.date >= this.filterLead.leadgeneratedfrom
            ));
          }
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.assignto2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let y of this.filterLead.assignto2) {
        if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.assignedTo.firstName == y.item_text &&
            $data.date >= this.filterLead.leadgeneratedfrom
          ));
        }
      }
      this.selectedData = filterLeadData
    }
    else if (!!this.filterLead.assignto2 && !!this.filterLead.leadpriority2) {
      for (let y of this.filterLead.assignto2) {
        for (let b of this.filterLead.leadpriority2) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.assignedTo.firstName == y.item_text &&
            $data.leadType == b.item_text
          ));
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.assignto2 && !!this.filterLead.source2) {
      for (let y of this.filterLead.assignto2) {
        for (let a of this.filterLead.source2) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.assignedTo.firstName == y.item_text &&
            $data.source == a.item_text
          ));
        }
      }
      this.selectedData = filterLeadData
    }



    else if (!!this.filterLead.source2 && !!this.filterLead.leadpriority2) {
      for (let a of this.filterLead.source2) {
        for (let b of this.filterLead.leadpriority2) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.source == a.item_text &&
            $data.leadType == b.item_text
          ));
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.source2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let a of this.filterLead.source2) {
        if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.source == a.item_text &&
            $data.date >= this.filterLead.leadgeneratedfrom
          ));
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.leadpriority2 && !!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {
      for (let b of this.filterLead.leadpriority2) {
        if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {
          filterLeadData = filterLeadData.concat(this.bridgess.filter(($data) =>
            $data.leadType == b.item_text &&
            $data.date >= this.filterLead.leadgeneratedfrom
          ));
        }
      }
      this.selectedData = filterLeadData
    }

    else if (!!this.filterLead.assignto2) {

      for (let y of this.filterLead.assignto2) {

        assignedToData = assignedToData.concat(this.bridgess.filter(($assigntod) => $assigntod.assignedTo.firstName == y.item_text));

      }

      this.selectedData = assignedToData;
      // console.log(this.selectedData);

    }


    else if (!!this.filterLead.source2) {
      for (let y of this.filterLead.source2) {
        sourceToData = sourceToData.concat(this.bridgess.filter(($sourcetod) => $sourcetod.source == y.item_text));

      }

      this.selectedData = sourceToData;
      // console.log(this.selectedData);

    }

    else if (!!this.filterLead.leadpriority2) {
      for (let y of this.filterLead.leadpriority2) {

        leadpriorityToData = leadpriorityToData.concat(this.bridgess.filter(($leadprioritytod) => $leadprioritytod.leadType == y.item_text));

      }
      this.selectedData = leadpriorityToData;
      // console.log(this.selectedData);

    }


    else if (!!this.filterLead.leadgeneratedfrom && !!this.filterLead.leadgeneratedto) {


      if (this.filterLead.leadgeneratedto >= this.filterLead.leadgeneratedfrom) {

        leadgeneratedToData = leadgeneratedToData.concat(this.bridgess.filter(
          m => m.date <= this.filterLead.leadgeneratedto && m.date >= this.filterLead.leadgeneratedfrom
        ));

        this.selectedData = leadgeneratedToData;

        console.log('this.selectedData', this.selectedData)
      }


    }
    // $('.sidepanel').hide();
  }

}
