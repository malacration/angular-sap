import { Document } from './document';
import { DocumentLine } from './document-line';

export class PurchaseDownPayment extends Document {
  constructor(cardCode: String, documentLines: Array<DocumentLine>) {
    super();
    this.CardCode = cardCode;
    this.DocumentLines = documentLines;
    this.DocTotal = documentLines
      .map((it) => it.LineTotal)
      .reduce((sum, current) => sum + current, 0);
    this.BPL_IDAssignedToInvoice = 2
  }
  DownPaymentType: String = 'dptInvoice';
}