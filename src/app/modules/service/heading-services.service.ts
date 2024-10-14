import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingServicesService {
  dateObj = new Date();
  time = this.dateObj.toLocaleTimeString();
  curtime = ("0" + this.dateObj.getHours()).slice(-2) + ':' + ("0" + this.dateObj.getMinutes()).slice(-2);
  month2 = this.dateObj.getMonth() + 1;
  month = (this.month2 < 10 ? '0' : '') + this.month2;
  day = (this.dateObj.getDate() < 10 ? '0' : '') + this.dateObj.getDate();
  year = this.dateObj.getUTCFullYear();
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  
  savedModules: any;
  newdate = this.day + '-' + this.month + '-' + this.year;
  newrevdate = this.year + '-' + this.month + '-' + this.day;
  MainWord: any = {
    heading101: 'Add', heading102: 'Update', heading103: 'Added', heading104: 'Updated', heading105: 'Save', heading106: 'Successfully', heading107: 'Detail', heading108: 'Attachment', heading109: 'Filter', heading110: 'Search',
    heading111: 'Action', heading112: 'Cancel', heading113: 'Apply', heading114: 'Reset', heading115: 'View', heading116: 'Details', heading117: 'Filters', heading118: 'Item', heading119: '', heading120: ''
  }
  newdatetime = this.newdate + ' ' + this.time;
  allFields: any;
  loginDataSubject = new Subject<any>();

  getPlusDayDate(dayss: number) {
    const dateObj = new Date(); // June 1, 2022 UTC time

    dateObj.setDate(dateObj.getDate() + dayss);
    var month2 = dateObj.getMonth() + 1;
    var month = (month2 < 10 ? '0' : '') + month2;
    var day = (dateObj.getDate() < 10 ? '0' : '') + dateObj.getDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + '-' + month + '-' + day;
    return newdate
  }
  getDate() {
    // return this.newdate
    return this.newrevdate
  }
  getrevDate() {
    return this.newrevdate
  }

  getDateTime() {
    return this.newdatetime
  }

  getTime() {
    return this.curtime
  }

  getAllFields(): any {
    const allFields = sessionStorage.getItem('Allfields');
    if (allFields) {
      // return JSON.parse(allFields);
      this.allFields = JSON.parse(allFields)
    } else {
      console.error('No data found in sessionStorage for Allfields');
      return null;
    }
  }

  Module0: any[] = [ // Dashboard
    {
      leftheading: 'Dashboard', heading0: 'Welcome to Bridge: Sales CRM', heading1: 'Total Revenue', heading2: 'Total Sale', heading3: 'Total Customers',
      heading4: 'Total Lead', heading5: 'Total Order', heading6: 'Collection vs Projection Amount', heading60: 'Top 10 Customers', heading7: 'Delivery Status', heading8: 'Best Selling Item by Sales Amount', heading9: 'Inventory Status', heading10: 'Hot and Warm Deals', heading11: 'Lead Source',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    }
  ];
  Module1: any[] = [ // User
    {
      leftheading: 'User', heading0: 'ID', heading1: 'First Name', heading2: 'Last Name', heading3: 'Employee ID', heading4: 'Role', heading5: 'Zone', heading6: 'Email',
      heading7: 'Phone', heading8: 'Reporting To', heading9: 'Designation', heading10: 'Password', heading11: 'Status', heading12: 'Name', heading13: '', heading14: '', heading100: 'Last Updated',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    }

  ];

  Module2: any[] = [ // Lead
    {
      leftheading: 'Lead', SubHeading1: 'General', SubHeading2: 'Junk', SubHeading3: 'Split', SubHeading4: 'Kanban', heading0: 'ID', heading1: 'Company Name', heading2: 'Person Name', heading3: this.Module1[0].heading7, heading4: 'Person Designation', heading5: this.Module1[0].heading6, heading6: 'Location',
      heading7: 'Source', heading8: 'Product Interest', heading9: 'Num Of Employee', heading10: 'Turnover', heading11: this.Module1[0].heading11, heading12: 'Lead Priority', heading13: 'Assigned To', heading14: 'Remarks', heading15: 'Created By', heading16: 'Created Date', heading17: 'BP', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120

    },
    {
      heading: 'Follow Up', heading0: 'Date', heading1: 'Time', heading2: 'Mode of Communication', heading3: 'Comment', heading4: 'Reminder',
    }
  ];


  Module21: any[] = [ // Campain
    {
      leftheading: 'Campaign', SubHeading1: 'Campaign Set', heading0: 'ID', heading1: 'Campaign Set Name', heading2: 'Campaign Access', heading3: 'Description', heading4: 'Source', heading5: 'Priority', heading6: 'From Date',
      heading7: 'To', heading8: 'Status', heading9: 'From Date', heading10: 'To', heading11: 'Type', heading12: 'Sales Employee', heading13: 'Type', heading14: 'Sales Person', heading15: 'From Date', heading16: 'To', heading17: 'Industry', heading18: 'Country', heading19: 'States', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120

    },
  ]


  Module3: any[] = [ // Business Partner
    {
      leftheading: 'Business Partner', SubHeading: 'BP', SubHeading2: 'General Details', SubHeading3: 'Contact Details', heading0: 'BP Code', heading1: this.Module2[0].leftheading, heading2: this.Module2[0].heading1
      , heading3: 'Website', heading4: this.Module1[0].heading7, heading5: this.Module2[0].heading5, heading6: this.Module2[0].heading10
      , heading7: 'Industry', heading8: 'Sales Employee', heading9: 'Business Type', heading10: 'Payment Term'
      , heading11: this.Module1[0].heading5, heading12: 'Parent Account', heading13: 'GST', heading14: this.Module2[0].heading14
      , heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    {
      SubHeading: 'Contact Person', heading: 'Contact Person', heading0: 'Contact Name', heading02: 'Last Name', heading1: this.Module1[0].heading7, heading2: this.Module2[0].heading5, heading3: 'Address', heading4: 'Position',
    },
    {
      SubHeading: 'Branch', heading: 'Address Details', SubHeading1: 'Billing', SubHeading2: 'Shipping Address', heading0: 'Billing Name', heading1: 'Billing Address', heading2: 'City', heading3: 'State', heading4: 'Country', heading5: 'Zip code', heading6: 'Shipping Type',heading7: 'Shipping Name',
      heading8: 'City1', heading9: 'State1', heading10: 'Country1', heading11: 'Zip code1',heading12: 'Shipping Type1'
    },
    {
      quicklink1: 'Opportunity', quicklink2: 'Quotation', quicklink3: 'Order', quicklink4: 'Invoice'
    }
  ];

  Module4: any[] = [ // Opportunity
    {
      leftheading: 'Opportunity', heading0: 'ID', heading01: 'Created Date', heading1: this.Module2[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Close Date', heading6: this.Module3[0].heading8,
      heading7: 'Type', heading8: 'Probability', heading9: 'Lead Source', heading10: 'Remarks', heading11: 'Total Amount', heading12: this.Module3[3].quicklink2, heading13: 'Stage', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    {
      heading: 'Item Code', heading01: 'ID', heading0: 'Item Name', heading1: 'Category', heading2: 'Unit Price', heading3: 'Enter Discount (%) on Item', heading4: 'Enter Tax(GST)', heading5: 'Enter Quantity', heading6: 'Quantity', heading7: 'Tax(GST) %', heading8: 'Discount %', heading9: 'Open Qty'
    },
    {
      heading: 'Items', heading0: 'Click to view all items', heading1: 'Select Items from list', heading2: 'Selected Items from list', heading3: 'Add Items'
    },
    {
      quicklink1: 'Opportunity', quicklink2: 'Contact', quicklink3: 'Quotation', quicklink4: 'Order'
    }
  ];

  Module5: any[] = [ // Quotation
    {
      leftheading: 'Quotation', SubHeading: 'Details', heading0: 'ID', heading01: 'Created Date', heading1: this.Module4[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Posting Date', heading50: 'Valid Date', heading51: 'Document Date', heading6: this.Module3[0].heading8,
      heading7: 'Branch', heading8: this.Module3[0].heading10, heading9: 'Freight Charge', heading91: 'Attachments', heading10: this.Module4[0].heading10, heading11: 'Total Amount', heading12: this.Module4[1].heading8,
       heading13: this.Module4[3].quicklink4, heading14: 'Status', heading15: 'PDF', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    // this.Module3[2],
    {
      SubHeading: 'Branch', heading: 'Address Details', SubHeading1: 'Billing', SubHeading2: 'Shipping Address', heading0: 'Billing Name', heading1: 'Billing Address', heading2: 'City',
       heading3: 'State', heading4: 'Country', heading5: 'Zip code', heading6: 'Shipping Type',heading7: 'Shipping Name', heading8: 'Zip code',heading9: 'Country',heading10: 'State',heading11: 'City',
       heading12: 'Shipping Name',heading13: 'Shipping Type', heading111: 'Billing Steet',SubHeading22: 'Shipping Street'
        
    },
    this.Module4[1],
    this.Module4[2],
    {
      heading: 'Total Before Discount', heading0: 'Total After Discount', heading1: 'Grand Total',
    }
  ];

  Module6: any[] = [   // Order
    {
      leftheading: 'Order', SubHeading: 'Details', Extra1: 'PO NO.', Extra2: 'PO Date', Extra3: 'Delivery', Extra4: 'Invoice',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    // this.Module5[0],
    {
      leftheading: 'Quotation', SubHeading: 'Details', heading0: 'ID', heading01: 'Created Date', heading1: this.Module4[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Posting Date', heading50: 'Valid Date', heading51: 'Document Date', heading6: this.Module3[0].heading8,
      heading7: 'Branch', heading8: this.Module3[0].heading10, heading9: 'Freight Charge', heading91: 'Attachments', heading10: this.Module4[0].heading10, heading11: 'Total Amount', heading12: this.Module4[1].heading8, heading13: this.Module4[3].quicklink4, heading14: 'Status', heading15: 'PDF', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    // this.Module5[1],
    {
      SubHeading: 'Branch', heading: 'Address Details', SubHeading1: 'Billing', SubHeading2: 'Shipping Address', heading0: 'Billing Name', heading1: 'Billing Address', heading2: 'City',
       heading3: 'State', heading4: 'Country', heading5: 'Zip code', heading6: 'Shipping Type',heading7: 'Shipping Name', heading8: 'Zip code',heading9: 'Country',heading10: 'State',
       heading11: 'City',heading13: 'Shipping Type',SubHeading22: 'Shipping Street', heading111: 'Billing Steet'
    },
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]

  Module7: any[] = [  // Delivery
    {
      leftheading: 'Delivery', SubHeading: 'Delivery Details', Extra1: 'PO NO.', Extra2: 'PO Date', Extra3: 'Order Placed on', Extra4: 'Invoice',
      Extra5: 'Tracking Details', Extra6: 'Tracking ID', Extra7: 'Shipped With', Extra8: 'Dispatched Date', Extra9: 'Expected Delivery',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
     // this.Module5[0],
     {
      leftheading: 'Quotation', SubHeading: 'Details', heading0: 'ID', heading01: 'Created Date', heading1: this.Module4[0].leftheading, heading2: 'Name', heading3: this.Module3[0].leftheading, heading4: this.Module3[1].SubHeading, heading5: 'Posting Date', heading50: 'Valid Date', heading51: 'Document Date', heading6: this.Module3[0].heading8,
      heading7: 'Branch', heading8: this.Module3[0].heading10, heading9: 'Freight Charge', heading91: 'Attchments', heading10: this.Module4[0].heading10, heading11: 'Total Amount', heading12: this.Module4[1].heading8, heading13: this.Module4[3].quicklink4, heading14: 'Status', heading15: 'PDF', heading100: this.Module1[0].heading100,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    // this.Module5[1],
    {
      SubHeading: 'Branch', heading: 'Address Details', SubHeading1: 'Billing', SubHeading2: 'Shipping Address', heading0: 'Billing Name', heading1: 'Billing Address', heading2: 'City', heading3: 'State', heading4: 'Country', heading5: 'Zip code', heading6: 'Shipping Type',heading7: 'Shipping Name',
    },
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]


  Module8: any[] = [   //  Invioice
    {
      leftheading: 'Invoice', SubHeading: 'Invoice Information',heading1:'Create By',heading2:'Self',heading3:'Order',heading4:'Delivery',heading5:'Business Partner',heading6:'Contact Person',
      heading7:'Sales Employee',heading8:'Posting Date',heading9:'Valid Date',heading10:'Document Date',heading11:'Branch',heading12:'Payment Term',heading13:'Remarks',heading14:'Items',
      heading15:'Total Amount',heading16:'Discount %',heading17:'Freight Charge',heading18:'Address',heading19:'Billing Address',heading20:'Billing Name',heading21:'Zip code',heading22:'Country',
      heading23:'State',heading24:'Billing City',heading25:'Shipping Type',heafing26:'Ship To Different Address?',heading27:'Shipping Address',heading28:'Shipping Name',heading29:'Zip code',
      heading30:'Country',heading31:'State',heading32:'Shipping City',heading33:'Shipping Type',heading34:'Shipping Address',heading35:'Description',heading36:'City',heading199:'Billing Address',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    this.Module5[0],
    this.Module5[1],
    this.Module5[2],
    this.Module5[3],
    this.Module5[4],

  ]

  Module9: any[] = [   // Payment Collection
    {
      leftheading: 'Payment Collection', SubHeading: 'Invoice Information', Extra1: 'PO NO.', Extra2: 'PO Date', Extra3: 'Delivery', Extra4: 'Invoice No',
      Extra5: 'Transaction ID', Extra6: 'Transaction  Mode', Extra7: 'Received Amt', Extra8: 'Balance Pending', Extra9: 'Invoice Amt', Extra10: 'Transation Date',
      heading1: this.Module3[0].leftheading,
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
  ]

  Module10: any[] = [   // Report
    {
      leftheading: 'Reports', SubHeading: 'Report', Extra1: 'Description', Extra2: 'Last Accessed', Extra3: 'Module Wise Report', Extra4: 'Access',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
  ]

  Module11: any[] = [   // Target Assignment
    {
      leftheading: 'Target Assignment', SubHeading: 'Target Amount', Extra1: 'Financial Year', Extra2: 'Amount Left', Extra3: 'Delivery', Extra4: 'Invoice',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
  ]
  Module12: any[] = [   // Inventory
    {
      leftheading: 'Inventory', SubHeading: 'Category', Extra1: 'Financial Year', Extra2: 'Amount Left', Extra3: 'Delivery', Extra4: 'Invoice',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
  ]

  Module13: any[] = [   // Inventory New
    {
      leftheading: 'Inventory New', heading0: 'ID', Extra1: 'Financial Year', Extra2: 'Name', Extra3: 'SKU', Extra4: 'Reorder Level', Extra5: 'Stock In Hand',
      Extra6: 'Selling Unit Price', heading1: this.Module4[2].heading3, header2: 'Group', Extra7: 'Edit', Extra8: 'Category',
      heading101: this.MainWord.heading101, heading102: this.MainWord.heading102, heading103: this.MainWord.heading103, heading104: this.MainWord.heading104, heading105: this.MainWord.heading105,
      heading106: this.MainWord.heading106, heading107: this.MainWord.heading107, heading108: this.MainWord.heading108, heading109: this.MainWord.heading109, heading110: this.MainWord.heading110,
      heading111: this.MainWord.heading111, heading112: this.MainWord.heading112, heading113: this.MainWord.heading113, heading114: this.MainWord.heading114, heading115: this.MainWord.heading115,
      heading116: this.MainWord.heading116, heading117: this.MainWord.heading117, heading118: this.MainWord.heading118, heading119: this.MainWord.heading119, heading120: this.MainWord.heading120
    },
    {
      header1: 'Image', header2: 'Name', header3: this.Module4[2].heading,
    },
  ]
  constructor() {
    const savedFieldsString = sessionStorage.getItem('Allfields');
    if (savedFieldsString) {
      this.allFields = JSON.parse(savedFieldsString);
      // debugger
      this.changeFieldName();
      this.changeFieldName2();
      this.changeFieldName3();
      this.changeFieldName4();
      this.changeFieldName5();
      this.changeFieldName6();
      this.changeFieldName8();
      this.changeFieldName21();
      this.changeFieldName7();

      // console.log('Retrieved Allfields from sessionStorage:', this.allFields);
    } else {
      // console.error('No Allfields data found in sessionStorage');
    }
  }





  changeFieldName21() {
    const keyToHeadingMap: any = {
      'CampaignSetName': ['heading1',0],
      'CampaignAccess': ['heading2',0],
      'Description': ['heading3',0],
      'LeadSource': ['heading4',0],
      'LeadPriority': ['heading5',0],
      'LeadFromDate': ['heading6',0],
      'LeadToDate': ['heading7',0],
      'LeadStatus': ['heading8',0],
      'OppFromDate': ['heading9',0],
      'OppToDate': ['heading10',0],
      'OppType': ['heading11',0],
      'OppSalePerson': ['heading12',0],
      'BPType': ['heading13',0],
      'BPSalePerson': ['heading14',0],
      'BPFromDate': ['heading15',0],
      'BPToDate': ['heading16',0],
      'BPIndustry': ['heading17',0],
      'BPCountry': ['heading18',0],
      'BPState': ['heading19',0],

    };
    // debugger
    if (this.allFields[1].module_name === 'Campaign' && this.allFields[3].data.length > 0) {
      this.allFields[1].data.forEach((field: { key: string | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module21[heading[1]][heading[0]] = field.label;
          // console.log(field.label)
        }
      });
    }
  }


  changeFieldName() {
    const keyToHeadingMap: any = {
      'companyName': 'heading1',
      'contactPerson': 'heading2',
      'designation': 'heading4',
      'location': 'heading6',
      'numOfEmployee': 'heading9',
      'turnover': 'heading10',
      'source': 'heading7',
      'phoneNumber': 'heading3',
      'email': 'heading5',
      'productInterest': 'heading8',
      'status': 'heading11',
      'assignedTo': 'heading13',
      'leadType': 'heading12',
      'message': 'heading14',


    };

    if (this.allFields[0].module_name === 'Lead' && this.allFields[0].data.length > 0) {
      // debugger
      this.allFields[0].data.forEach((field: { key: string | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module2[0][heading] = field.label;
          // console.log(field.label)
        }
      });
    }
  }

  changeFieldName2() {
    const keyToHeadingMap: any = {
  'CardName': ['heading2',0],
    'Website': ['heading3',0],
    'Phone1': ['heading4',0],
    'EmailAddress':['heading5',0],
    'PayTermsGrpCode': ['heading10',0],
    'SalesPersonCode': ['heading8',0],
    'ContactPerson': ['SubHeading3',0],
    'U_PARENTACC': ['heading12',0],
    'U_CONTOWNR': ['heading',0],
    'U_ANLRVN': ['heading6',0],
    'U_LEADNM': ['heading1',0],
    'E_Mail': ['heading2',1],
    'Remarks1': ['heading14',0],
    'BPCode': ['heading0',0],
    'GSTIN': ['heading13',0],
    'Country1':[ 'heading10',2],
    'state':['heading3',2],
    'Industry':['heading7',0],
    'U_SHPTYP': ['heading6',2],
    'City':['heading2',2],
    'State':['heading3',2],
    'Country':['heading4',2],
    'ZipCode':['heading5',2],
    'ZipCode1':['heading11',2],
    'State1':['heading9',2],
    'AddressName1':['heading7',2],
    'Street1':['SubHeading2',2],
    'City1':['heading8',2],
    'U_SHPTYP1':['heading12',2],
    'U_TYPE':['heading9',0],
    'AddressName':['heading0',2],
    'Street':['heading1',2],

 };

    // debugger
    if (this.allFields[2].module_name === 'BusinessPartner' && this.allFields[0].data.length > 0) {
      this.allFields[2].data.forEach((field: { key: any | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module3[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
        }
      });
    }
  }

  changeFieldName3() {
    const keyToHeadingMap: any = {
      'SalesPerson': 'heading6',
      'ContactPerson': 'heading4',
      'U_LSOURCE': 'heading9',
      'Remarks': 'heading10',
      'ClosingDate': 'heading5',
      'U_TYPE': 'heading7',
      'U_PROBLTY': 'heading8',
      'DocTotal': 'heading11',
      'U_LEADID': 'heading1',


    };
    // debugger
    if (this.allFields[3].module_name === 'Opportunity' && this.allFields[3].data.length > 0) {
      this.allFields[3].data.forEach((field: { key: string | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module4[0][heading] = field.label;
          // console.log(field.label)
        }
      });
    }
  }
  changeFieldName4() {
    const keyToHeadingMap: any = {
      'U_QUOTNM': ['heading2',0],
      'U_OPPRNM': ['heading1',0],
      'CardCode': ['heading3',0],
      'ContactPersonCode': ['heading4',0],
      'SalesPersonCode' : ['heading6',0],
      'TaxDate' : ['heading5',0],
      'DocDueDate' : ['heading50',0],
      'DocDate' : ['heading51',0],
      'BPLID' : ['heading7',0],
      'PaymentGroupCode': ['heading8',0],
      'Comments' : ['heading10',0],
      'DocTotal' : ['heading11',0],
      'DiscountPercent' : ['heading12',0],
      'FreightCharge' : ['heading9',0],
      'BillToId' : ['heading1',1],
      'BillToBuilding' : ['heading0',1],
      'BillToZipCode' : ['heading5',1],
      'BillToCountry' : ['heading4',1],
      'BillToState' : ['heading3',1],
      'BillToCity' : ['heading2',1],
      'U_SHPTYPB' : ['heading6',1],
      'BillToStreet' : ['heading111',1],
      'ShipToId' : ['SubHeading2',1],
      'ShipToBuilding' : ['heading7',1],
      'ShipToZipCode' : ['heading8',1],
      'ShipToCounty': ['heading9',1] ,
      'ShipToState' : ['heading10',1],
      'ShipToCity' : ['heading11',1],
      'U_SHPTYPS' : ['heading13',1],
      'ShipToStreet' : ['SubHeading22',1],

    };

    if (this.allFields[4].module_name === 'Quotation' && this.allFields[4].data.length > 0) {
      this.allFields[4].data.forEach((field: { key: any | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module5[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
        }
      });
    }
  }

  changeFieldName5() {
    const keyToHeadingMap: any = {
      'U_QUOTNM': ['leftheading',1],
      'U_OPPRNM': ['heading1',1],
      'CardCode': ['heading3',1],
      'ContactPersonCode': ['heading4',1],
      'SalesPersonCode' : ['heading6',1],
      'TaxDate' : ['heading5',1],
      'DocDueDate' : ['heading50',1],
      'DocDate' : ['heading51',1],
      'PONumber' : ['Extra1',0],
      'PODate' : ['Extra2',0],
      'BPLID' : ['heading7',1],
      'PaymentGroupCode': ['heading8',1],
      'Comments' : ['heading10',1],
      'DocTotal' : ['heading11',1],
      'DiscountPercent' : ['heading12',1],
      'FreightCharge' : ['heading9',1],
      'BillToId' : ['heading1',2],
      'BillToBuilding' : ['heading0',2],
      'BillToZipCode' : ['heading5',2],
      'BillToCountry' : ['heading4',2],
      'BillToState' : ['heading3',2],
      'BillToCity' : ['heading2',2],
      'U_SHPTYPB' : ['heading6',2],
      'BillToStreet' : ['heading111',2],
      'ShipToId' : ['SubHeading2',2],
      'ShipToBuilding' : ['heading7',2],
      'ShipToZipCode' : ['heading8',2],
      'ShipToCounty': ['heading9',2] ,
      'ShipToState' : ['heading10',2],
      'ShipToCity' : ['heading11',2],
      'U_SHPTYPS' : ['heading13',2],
      'ShipToStreet' : ['SubHeading22',2],
    };

    if (this.allFields[5].module_name === 'Order' && this.allFields[5].data.length > 0) {
      this.allFields[5].data.forEach((field: { key: any | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module6[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
        }
      });
    }
  }



  changeFieldName8(){
    const keyToHeadingMap: any={
     'CardName':['heading1',0],
     'InvoiceNo':['Extra4',0],
      'TransactMod':['Extra6',0],
      'TransactId':['Extra5',0],
      'ReceivedAmount':['Extra7',0],
      'DueAmount':['Extra8',0],
      'TotalAmt':['Extra9',0],
      'PaymentDate':['Extra10',0],
      'Remarks':['heading105',0],
    };

    if (this.allFields[8].module_name === 'Payment' && this.allFields[8].data.length > 0) {
      this.allFields[8].data.forEach((field: { key: string | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module9[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
          // console.log(field.label)
        }
      });
    }
  }

  changeFieldName6() {
    const keyToHeadingMap: any = {
      'OrderID': ['heading13',1],
      'CardName': ['heading3',1],
      'DiscountPercent': ['heading12',1],
      'DocDate': ['Extra3',0],
      'PONumber': ['Extra1',0],
      'DocTotal': ['heading11',1],
      'FreightCharge': ['heading9',1],
      'PODate': ['Extra2',0],
      'ShipToStreet': ['SubHeading2',2],
      'ShipToBuilding': ['heading7',2],
      'ShipToCity': ['heading2',2],
      'ShipToState': ['heading3',2],
      'ShipToCountry': ['heading4',2],
      'ShipToZipCode': ['heading5',2],
      'U_SHPTYPS': ['heading6',2],
      'TrackingId': ['Extra6',0],
      'ShippedWith': ['Extra7',0],
      'DispatchedDate': ['Extra8',0],
      'DocDueDate': ['Extra9',0],
      // 'TrackingId': ['Extra1',0],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
      // 'OrderID': ['heading13',1],
    };

    if (this.allFields[6].module_name === 'Delivery' && this.allFields[6].data.length > 0) {
      this.allFields[6].data.forEach((field: { key: any | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module7[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
        }
      });
    }
  }

  changeFieldName7() {
    const keyToHeadingMap: any = {
      // 'U_QUOTNM': ['heading2',0],
      // 'U_OPPRNM': ['heading1',0],
      'CardCode': ['heading5',0],
      'ContactPersonCode': ['heading6',0],
      'SalesPersonCode' : ['heading7',0],
      'TaxDate' : ['heading8',0],
      'DocDueDate' : ['heading9',0],
      'DocDate' : ['heading10',0],
      'BPLID' : ['heading11',0],
      'PaymentGroupCode': ['heading12',0],
      'Comments' : ['heading13',0],
      'DocTotal' : ['heading15',0],
      'DiscountPercent' : ['heading16',0],
      'FreightCharge' : ['heading17',0],
      'BillToId' : ['heading19',0],
      'BillToBuilding' : ['heading20',0],
      'BillToZipCode' : ['heading21',0],
      'BillToCountry' : ['heading22',0],
      'BillToState' : ['heading23',0],
      'BillToCity' : ['heading24',0],
      'U_SHPTYPB' : ['heading25',0],
      'BillToStreet' : ['heading199',0],
      'ShipToId' : ['heading27',0],
      'ShipToBuilding' : ['heading28',0],
      'ShipToZipCode' : ['heading29',0],
      'ShipToCounty': ['heading30',0] ,
      'ShipToState' : ['heading31',0],
      'ShipToCity' : ['heading32',0],
      'U_SHPTYPS' : ['heading33',0],
      'ShipToStreet' : ['heading34',0],

    };

    if (this.allFields[7].module_name === 'Invoice' && this.allFields[7].data.length > 0) {
      this.allFields[7].data.forEach((field: { key: any | number; label: any; }) => {
        const heading = keyToHeadingMap[field.key];
        if (heading) {
          this.Module8[heading[1]][heading[0]] = JSON.parse(JSON.stringify(field.label));
        }
      });
    }
  }





  isModulefieldMendetory(module_id: number, key: string): boolean {
    const selectedModule = this.allFields?.find((module: any) => module.module_id == module_id);
    if (selectedModule) {
      // Find if the field with the given key is mandatory
      const isFieldMandatory = selectedModule.data.some((item: any) => item.key == key && (item.is_mandatory == 'true' || item.is_mandatory == true));
      // console.log(key, isFieldMandatory);
      return isFieldMandatory;
    }
    return false;
  }




  logindatapost(data: any) {
    this.loginDataSubject.next(data);
  }
  getLoginData() {
    return this.loginDataSubject.asObservable();
  }

  getZeroModule(): any[] {
    return this.Module0;
  }
  getFirstModule(): any[] {
    return this.Module1;
  }

  getModule2(): any[] {
    return this.Module2;
  }

  getModule3(): any[] {
    return this.Module3;
  }
  getModule4(): any[] {
    return this.Module4;
  }
  getModule5(): any[] {
    return this.Module5;
  }

  getModule6(): any[] {
    return this.Module6;
  }

  getModule7(): any[] {
    return this.Module7;
  }

  getModule8(): any[] {
    return this.Module8;
  }

  getModule9(): any[] {
    return this.Module9;
  }

  getModule10(): any[] {
    return this.Module10;
  }

  getModule11(): any[] {
    return this.Module11;
  }

  getModule12(): any[] {
    return this.Module12;
  }

  getModule13(): any[] {
    return this.Module13;
  }

  getModule21(): any[] {
    return this.Module21;
  }



  getReturnLeftMenu() {
    var allmodule: any[] = [];
    allmodule.push(this.Module0[0]);
    allmodule.push(this.Module1[0]);
    allmodule.push(this.Module2[0]);
    allmodule.push(this.Module3[0]);
    allmodule.push(this.Module4[0]);
    allmodule.push(this.Module5[0]);
    allmodule.push(this.Module6[0]);
    allmodule.push(this.Module7[0]);
    allmodule.push(this.Module8[0]);
    allmodule.push(this.Module9[0]);
    allmodule.push(this.Module10[0]);
    allmodule.push(this.Module11[0]);
    allmodule.push(this.Module12[0]);
    allmodule.push(this.Module13[0]);
    allmodule.push(this.Module21[0]);
    return allmodule
  }


  isModuleView(module_id: number): boolean {
    let savedModules2:any = sessionStorage.getItem('savedModules');
    this.savedModules = JSON.parse(savedModules2)
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_view) {
      return true;
    }
    return false;
  }

  isModuleViewadd(module_id: number): boolean {  
    let savedModules2:any = sessionStorage.getItem('savedModules');
    this.savedModules = JSON.parse(savedModules2)
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_add) {
      // console.log(selectedModule[0].is_add)
      return true;
    }
    return false;
  }

  isModuleViewedit(module_id: number): boolean { 
    let savedModules2:any = sessionStorage.getItem('savedModules');
    this.savedModules = JSON.parse(savedModules2) 
    const selectedModule = this.savedModules?.filter((module: any) => module.module_id === module_id);
    if (selectedModule && selectedModule.length > 0 && selectedModule[0].is_edit) {
      return true;
    }
    return false;
  }

}
