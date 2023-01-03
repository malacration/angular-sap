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
  SequenceCode = -2
  SequenceSerial : number
  cnpjFilial : String;
}


