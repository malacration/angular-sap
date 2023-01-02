export class DocumentLine {
  ItemCode: String;
  Quantity: number;
  TaxCode: String;
  UnitPrice: number;
  LineTotal: number;
  Usage = 15
  AccountCode = "6.1.1.002.00001"

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

//               "AccountCode" : "1.1.3.004.00001",]
//               "TaxCode" : "2101-009",
// "TaxType" : "tt_Yes",
// "TaxLiable" : "tYES",
//