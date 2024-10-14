export class ProductItem {
  ProductItemArray: any[] = [];
  modalSelectName: string = 'PRODUCT';
  modalSelectLabelName: string = 'Select Products';
  modalSelectedLabelName: string = "";
  productComponent: boolean = true;
  selectItems: boolean = false;
  isSelectItemList: boolean = true;
  isSelectedItems: boolean = false;
  isSelectedItemList: boolean = false;
  openSelectProduct() {
    this.productComponent = false;
    if (!!this.ProductItemArray.length) {
      this.selectItems = false;
    } else {
      this.selectItems = true;
    }
  }
  closeSelectProduct() {
    this.productComponent = true;
  }
  selectItemsListToggle() {
    this.isSelectItemList = !this.isSelectItemList;
  }
  updateCardItem($cardItemIndex: any, isInc: boolean) {

    if (isInc) {
      this.ProductItemArray[$cardItemIndex].Quantity++;
    } else {
      if (this.ProductItemArray[$cardItemIndex].Quantity != 1) {
        this.ProductItemArray[$cardItemIndex].Quantity--;
      }
    }
  }
}
export class ProductItemDetail {
  productItemDetails: any;
  productItemDetailList: any;
  constructor() {
    this.productItemDetails = [
      { name: 'Item Code', value: 110024 },
      { name: 'Stock', value: "200 Units" },
    ]
    this.productItemDetailList = [
      { name: 'Item Code', value: 110024 },
      { name: 'Unit Price', value: "200" },
      { name: 'Tax Code', value: "200" },
      { name: 'Tax', value: "0%" },
      { name: 'Discount', value: "0%" },
    ]
  }
}

export class CommonModulesPayload {
  payload: any = {};
  constructor(module_name:string) {
    this.payload = {
      module_name,
      report_title: "",
      fields: [],
      filter: [],
    }
  }
}
export class CommonModulesPayloadReport {
  payload: any = {};
  constructor() {
    this.payload = {
          CreateDate__gte: "",
          CreateDate__lte: ""
      }
    }
  }
