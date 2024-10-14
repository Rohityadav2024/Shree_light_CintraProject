import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngAfterViewInit() {
    (document.querySelector('.sidebar') as HTMLElement)?.classList?.add('d-none');
    (document.querySelector('.figma-sidebar') as HTMLElement)?.classList?.add('d-none');
  }
  ngOnInit(): void {
    sessionStorage.removeItem('rolename');
    sessionStorage.removeItem('srolename');

    sessionStorage.removeItem('leadtype');
    sessionStorage.removeItem('leadstatus');
    sessionStorage.removeItem('leadcat');

    sessionStorage.removeItem('customerstates');

    sessionStorage.removeItem('opportunitystartdate');
    sessionStorage.removeItem('opportunitycustomer');
    sessionStorage.removeItem('opportunitysource');

    sessionStorage.removeItem('quotationstartdate');
    sessionStorage.removeItem('quotationcustomer');

    sessionStorage.removeItem('orderstartdate');
    sessionStorage.removeItem('ordercustomer');
  }

}
