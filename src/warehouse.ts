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
    CategoryName: string;   
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;    
    id?: number;
}


export interface Item {
    CodeType:string;
    ItemName:string;
    ItemCode: string;
    Inventory:string;
    CatID:any;
    UoS:string;
    Packing: string;
    Description: string;
    UnitPrice: string;
    Currency: string;
    HSN: string;
    TaxCode: number;
    Discount: number;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;    
    id?: number;
}



export interface EditItem {
    CodeType:string;
    ItemName:string;
    ItemCode: string;
    Inventory:string;
    CatID:any;
    UoS:string;
    Packing: string;
    Description: string;
    UnitPrice: string;
    Currency: string;
    HSN: string;
    TaxCode: number;
    Discount: number;
    Status: string;
    CreatedDate: string;
    CreatedTime: string;
    UpdatedDate: string;
    UpdatedTime: string;    
    id: number;
}

