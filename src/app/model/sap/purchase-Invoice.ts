import { Document } from './document';

export class PurchaseInvoice extends Document {
  
  constructor(document : Document) {
    super(
      document.CardCode,
      document.DocumentLines,
      document.SequenceSerial,
      document.cnpjFilial,
      document.SequenceCode);
      this.DocumentInstallments = document.DocumentInstallments
  }
}
