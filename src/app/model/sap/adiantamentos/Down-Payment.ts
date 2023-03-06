import { Document } from '../document';
import { DocumentLine } from '../document-line';

export class DownPayment extends Document {
  
  U_TX_DocEntryRef : number

  constructor(document : Document) {
    super(
      document.CardCode,
      document.DocumentLines,
      document.SequenceSerial,
      document.cnpjFilial,
      document.SequenceCode);
      this.DocumentInstallments = document.DocumentInstallments
      this.SequenceCode -1;
      this.U_TX_DocEntryRef = document.SequenceSerial
  }
  DownPaymentType: String = 'dptInvoice';
  InvoiceType : "it_DownPayment"
  DocEntry : number
  
}
