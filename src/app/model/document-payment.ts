import { Document } from './document';
import { DocumentLine } from './document-line';

export class DocumentPayment extends Document {
  constructor(cardCode: String, documentLines: Array<DocumentLine>) {
    super();
    this.CardCode = cardCode;
    this.DocumentLines = documentLines;
    this.DocTotal = 100;
  }
  DownPaymentType: String = 'dptInvoice';
}
