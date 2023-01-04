export class DocumentLine {
  ItemCode: String;
  Quantity: number;
  TaxCode: String;
  UnitPrice: number;
  LineTotal: number;
  Usage = 15
  AccountCode = "6.1.1.002.00001"
  WarehouseCode : string

  constructor(
    itemCode: String,
    qtd: number,
    taxCode: String,
    unitPrice: number
  ) {
    this.ItemCode = itemCode;
    this.Quantity = qtd;
    this.TaxCode = taxCode;
    this.UnitPrice = unitPrice;
    this.LineTotal = qtd * unitPrice;
  }
}