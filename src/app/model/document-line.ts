export class DocumentLine {
  ItemCode: String;
  Quantity: number;
  TaxCode: String;
  UnitPrice: number;
  LineTotal: number;
  BPLId : number = 2;

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
    this.BPLId = 2;
  }
}
