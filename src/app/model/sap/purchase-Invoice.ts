import { Document } from './document';
import { DocumentLine } from './document-line';

export class PurchaseInvoice extends Document {
  
  constructor(
    cardCode: String, documentLines: Array<DocumentLine>, numeroNf : number, 
    cnpjFilial : String, 
    sequenceCode : number = -1) {
      
    super();
    this.CardCode = cardCode;
    this.DocumentLines = documentLines;
    this.DocTotal = documentLines
      .map((it) => it.LineTotal)
      .reduce((sum, current) => sum + current*100, 0)/100;
    this.JournalMemo = "MIGRAÇÃO - "+cardCode+" - NF "+numeroNf
    this.SequenceSerial = numeroNf
    this.cnpjFilial = cnpjFilial
    this.SequenceCode = sequenceCode
  }
}
