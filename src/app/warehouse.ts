export interface Warehouse {
    Name: string;
    Address: string;
    City: string;
    State: string;
    Pin: string;
    Country: string;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;
    id?: number;
}

export interface Product {
    ItemName: string;
    ItemCode: string;
    Description: string;
    UnitPrice: string;
    Currency: string;
    HSN: string;
    TaxCode: string;
    Discount: string;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;
    id?: number;
}



export interface Category {
    CategoryImageURL?:any;
    CategoryName: string;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;
    id?: number;
}


export interface Item {
  AdditionalInfo?:any;
  ItemImageURL?:any;
  has_add_info: any;
    CodeType:string;
    ItemName:string;
    ItemCode: string;
    Inventory:any;
    CatID:any;
    UoS:string;
    Packing: string;
    Description: string;
    UnitPrice: string;
    Currency: string;
    HSN: string;
    TaxCode: number;
    Tax?:number;
    Discount: number;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;
    id?: number;
}



export interface EditItem {
  ItemImageURL?:any;
    CodeType:string;
    ItemName:string;
    ItemCode: string;
    Inventory:any;
    CatID:any;
    UoS:string;
    Packing: string;
    Description: string;
    UnitPrice: string;
    Currency: string;
    HSN: string;
    TaxCode: number;
    Tax?:number;
    Discount: number;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;
    id: number;
}

