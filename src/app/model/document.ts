import { DocumentLine } from './document-line';

export class Document {
  CardCode: String;
  DocumentLines: Array<DocumentLine>;
  DocTotal: number;
  BPLId : number = 2
}
