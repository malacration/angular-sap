import { DocumentLine } from './document-line';
import { Installment } from './installment';

export class Document {
  CardCode: String;
  DocumentLines: Array<DocumentLine>;
  DocTotal: number;
  BPL_IDAssignedToInvoice
  DocumentInstallments : Array<Installment>
  DocDate = "2022-12-01"
  Usage = 15
}


