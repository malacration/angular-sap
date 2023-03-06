import { Document } from '../document';

export class PurchaseDownPayment extends Document {
  
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
      this.JournalMemo = "MIGRAÇÃO - "+document.CardCode+" - Provisão Adiantamento "+document.SequenceSerial
      this.Usage = undefined
      this.DocumentLines.forEach(it => {
        it.Usage = undefined; 
        it.TaxCode = undefined
      })
      this.DocumentInstallments = undefined
      this.U_TX_DocEntryRef = document.SequenceSerial
  }  
  DownPaymentType: String = 'dptInvoice';
  InvoiceType : "it_PurchaseDownPayment"
  DocEntry : number

}
