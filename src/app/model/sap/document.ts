import { DocumentLine } from './document-line';
import { Installment } from './installment';

export class Document {
  CardCode: String;
  DocumentLines: Array<DocumentLine>;
  DocTotal: number;
  BPL_IDAssignedToInvoice
  DocumentInstallments : Array<Installment>
  DocDate = "2022-12-31"
  Usage = 15
  JournalMemo = "Migração de Saldo Inicial"
  SequenceCode = -1
  SequenceSerial : number
  cnpjFilial : String;

  constructor(cardCode: String, documentLines: Array<DocumentLine>,
    numeroNf : number, cnpjFilial : String, sequenceCode : number = -1) {
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


