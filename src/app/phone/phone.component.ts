import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from 'src/app/modules/service/bridge.service';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
active = 1;
error = '';
success = '';
PersonName:any;
Call:any={
  agent_number: sessionStorage.getItem('Mobile'),
  destination_number:'',
  get_call_id:1
}
  constructor(public configtab: NgbNavConfig,private bridgeService2: BridgeService,) {
    // customize default values of navs used by this component tree
    configtab.destroyOnHide = false;
    configtab.roles = false;
   }

  ngOnInit(): void {
  //  this.Call.destination_number = this.LeadData.phoneNumber
  //  this.PersonName = this.LeadData.contactPerson
    this.RecordCall();
  }
  // visible:boolean=false;
  @Output()
  hide: EventEmitter<void> = new EventEmitter();

  secondsToDhms(seconds:any) {
    // console.log(seconds)
    if(seconds == '0:0'){
      return '00:00:00';
    }
    else{
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h:any = Math.floor((seconds % (3600 * 24)) / 3600);
    h = (h < 10 ? '0' : '') + h;
    var m:any = Math.floor((seconds % 3600) / 60);
    m = (m < 10 ? '0' : '') + m;
    var s:any = Math.floor(seconds % 60);
    s = (s < 10 ? '0' : '') + s;
    return h+":"+m+":"+s;
    }
  }
  StartTime(item:any){
    if(item.recording_url != null){
      window.open(item.recording_url, '_blank');
    }
  }

  show2:boolean=false;
  hideModal() {
   this.show2=false;
    // $('#calls-lists').hide();
  }
  visible(item:any,history?:any){
    if(history){
      this.active = 2
    }
    else{
      this.active = 1
    }
    this.Call.destination_number = item.phoneNumber
    this.PersonName = item.contactPerson
    // $('#calls-lists').toggle();
    this.show2 = true;
  }
show:boolean=false;
  toggle(){
    this.show=!this.show;
  }
  obj:any = {
    "agent_number": sessionStorage.getItem('Mobile'),
    "destination_number": "9560763295",
      "get_call_id": 1
    }
  caller(){
    this.obj.destination_number = this.Call.destination_number
    // this.obj.agent_number = num;
    this.bridgeService2.callerAPi(this.obj).subscribe(
      (data: any[]) => {
       // console.log("rahu",data)
        // this.reportingNAme = data[0].firstName;
        // return data
      },
      (err:any) => {
        console.log(err);
        this.error = err;
      }
    );
  }

  callus(f: NgForm){
    // debugger
    // console.log(this.Call);
    this.bridgeService2.CallRecoderd(this.Call).subscribe(
      // this.bridgeService2.CallRecoderd(this.Call).subscribe(
      (res: any) => {
        if (Object(res)['message'] == "successful") {
          // Update the list of cars
          // this.bridges2.push(res)

          // Inform the user
          $(".success-box").show();

        }
        else {
          alert(Object(res)['message']);

        }
        // Reset the form
      },
      (err) => {
        const delim = ":"
        const name = err.message
        const result = name.split(delim).slice(3).join(delim)
        alert(result);
        //  this.ngOnInit();

      }
    );
    // $('.keypad-section').hide();
    // $('.keypad-notes').show();
    // var settings = {
    //   "url": "https://api-smartflo.tatateleservices.com/v1/click_to_call",
    //   "method": "POST",
    //   "timeout": 0,
    //   "headers": {
    //     "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NjgxODEiLCJpc3MiOiJodHRwczovL2Nsb3VkcGhvbmUudGF0YXRlbGVzZXJ2aWNlcy5jb20vdG9rZW4vZ2VuZXJhdGUiLCJpYXQiOjE3MTQ5OTM2MDMsImV4cCI6MjAxNDk5MzYwMywibmJmIjoxNzE0OTkzNjAzLCJqdGkiOiJEWmVpbGJzc3Q0UjhuQUZVIn0.frMED93D-c5umcMoPWGHRRa0kTGohBQxHO1pnSWKxWQ",
    //     "accept": "application/json",
    //     "content-type": "application/json"
    //   },
    //   "data": JSON.stringify({
    //     "agent_number": "7905539693",
    //     "destination_number": "9560763295",
    //     "get_call_id": 1
    //   }),
    // };

    // $.ajax(settings).done(function (response:any) {
    //   console.log(response);
    // });

  }
  keypadopen(){
    $('.keypad-section').show();
    $('.keypad-notes').hide();
  }


  public isPressed = false;
  selectedButton = {}
  enableDisableRule() {
    this.selectedButton= !this.selectedButton;
  }
 record:any;
  RecordCall(): void{
      this.bridgeService2.RecordData().subscribe(
        (data: any) => {
          // debugger
          this.record= data.results;

        },
        (err) => {
          console.log(err);
          this.error = err;
        }
      );

  }

}
