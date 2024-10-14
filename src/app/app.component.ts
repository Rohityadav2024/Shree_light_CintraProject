import { Component, VERSION } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter } from './modules/service/custom-date-parser-formatter.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[
    {provide:NgbDateParserFormatter,useClass:CustomDateParserFormatter}
  ]
})
export class AppComponent {
  title = 'Bridge-sales-app';
  onlineMessage:any;
  onlineMessageshow:any;
  checkinternet:boolean=false;

  constructor() {
    this.createOnline$().subscribe((isOnline) => {
      console.log(isOnline);
      if (isOnline) {
        this.checkinternet=false;
        // this.onlineMessageshow = 'You are connected to internet';
        // setTimeout(() => this.onlineMessageshow, 1)
      } else {
        this.checkinternet=true;
        this.onlineMessage =
          'Connection lost, Please check your internet connection.';
          // alert(this.onlineMessage);
      }
    });
  }
  // ngAfterViewInit(){
  //   window.addEventListener("resize", () => {
  //     this.commonWindowAdjector();
  //   })
  //   this.commonWindowAdjector();
  // }

  commonWindowAdjector() {
    if (window.innerWidth <= 855) {
      $(".figma-sidebar").addClass("active");
      $(".home-section").addClass("activee");
      $(".figma-menu-bar").addClass("opactity-0");
    } else {
      $(".figma-sidebar").removeClass("active");
      $(".home-section").removeClass("activee");
      $(".figma-menu-bar").removeClass("opactity-0");
    }
  }
  ngOnInit(): void {

    $("#sunil").click(function () {
      // If the clicked element has the active class, remove the active class from EVERY .nav-link>.state element
      if ($('.sidebar').hasClass("active")) {
        $(".sidebar").removeClass("active");
        $('.new-tabl th').removeClass("active");
        $('.sidebar .nav-links li').removeClass("activee");

      }
      // Else, the element doesn't have the active class, so we remove it from every element before applying it to the element that was clicked
      else {
        $(".sidebar").removeClass("active");
        $('.sidebar').addClass("active");
        $('.new-tabl th').addClass("active");
        $('.sidebar .nav-links li').addClass("activee");
      }
    });
    this.commonWindowAdjector();
      }

      createOnline$() {
        return merge(
          fromEvent(window, 'offline').pipe(map(() => false)),
          fromEvent(window, 'online').pipe(map(() => true)),
          new Observable((sub: Observer<boolean>) => {
            sub.next(navigator.onLine);
            sub.complete();
          })
        );
      }
}


