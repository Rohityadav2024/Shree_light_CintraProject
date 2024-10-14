import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent implements OnInit {

  p: number = 1;
  allSelected = false;
  isLoading: boolean = false;
  pagelimit: any = 10;
  config: any = { multi: false }
   checks = false;
  startind = ((this.p - 1) * this.pagelimit) + 1;
  endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
  paginationOption:any;
allItemsData: any[] = [
    {
      id:1,name: "User Management", sku: "sku1", category: "Baverages", stock: "10", price: "20000", active: false, subitem: [
        { id:1, catid:1,name: "Add User", sku: "sku1", category: "Baverages", stock: "10", price: "20000",active: false },
        { id:2, catid:1,name: "Delete User", sku: "sku1", category: "Baverages", stock: "10", price: "20000",active: false },
        { id:3, catid:1,name: "Read User", sku: "sku1", category: "Baverages", stock: "10", price: "20000",active: false },
      ]
    },
    {
      id:2, name: "Leads Management", sku: "sku2", category: "Clothes", stock: "10", price: "40000", active: false, subitem: [
        { id:4 , catid:2,name: "Add Leads  ", sku: "sku2", category: "Clothes", stock: "22", price: "40000",active: false },
        { id:5 , catid:2,name: "Delete Leads ", sku: "sku2", category: "Clothes", stock: "25", price: "40000",active: false },
        { id:6,catid:2,name: "Read Leads", sku: "sku1", category: "Baverages", stock: "10", price: "20000",active: false },
      ]
    },
    {
      id:3,name: "Calendar Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { id:7, catid:3,name: "Add Calendar ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { id:8,catid:3,name: "Read Calendar ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Customer Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Customer ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Customer ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Campaing Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Campaing ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Campaing ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Opportunity Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Opportunity ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Opportunity ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Quotation Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Quotation ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Quotation ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Order Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Order ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Order ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Payment Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Payment ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Payment ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Expense Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Expense ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Expense ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
    {
      name: "Invoice", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false,subitem: []
    },
    {
      name: "Inventory Management", sku: "sku3", category: "Fanta", stock: "30", price: "50000", active: false, subitem: [
        { name: "Add Inventory ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
        { name: "Read Inventory ", sku: "sku3", category: "Clothes", stock: "30", price: "50000" },
      ]
    },
  ];
  constructor() {

   }

  ngOnInit(): void {
  }
  clearFilter(event: any) {
    this.pagelimit = Number(event.target.value);
    this.p = 1;

    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.allItemsData.length) {
      this.endind = this.allItemsData.length;
    }
  }
  pageChanged(event: any) {
    this.p = event;
    this.startind = ((this.p - 1) * this.pagelimit) + 1;
    this.endind = ((this.p - 1) * this.pagelimit) + this.pagelimit;
    if (this.endind > this.allItemsData.length) {
      this.endind = this.allItemsData.length;
    }
  }
  toggle(index: number) {
    if (!this.config.multi) {
      this.allItemsData.filter((menu: any, i: number) => i !== index && menu.active).forEach((menu: any) => (menu.active = !menu.active));
    }
    this.allItemsData[index].active = !this.allItemsData[index].active;
  }
  checkAllCheckBox(e:any){
    if(e.target.checked == true){
      this.checks = true;

    }
    else{
      this.checks = false;
    }

  }


  isAllCheckBoxChecked() {
		return this.allItemsData.every(p => p.checked);
	}



}
