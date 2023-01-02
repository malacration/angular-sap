import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { COD_IMPOSTO, COD_ITEM } from 'src/app/model/importacao/constantes';
import { DocumentLine } from 'src/app/model/sap/document-line';
import { Installment } from 'src/app/model/sap/installment';
import { PurchaseInvoice } from 'src/app/model/sap/purchase-Invoice';
import { DocumentService as DocumentService } from '../../service/document-service';

@Component({
  selector: 'app-adiantamento',
  templateUrl: './adiantamento.component.html',
  styleUrls: ['./adiantamento.component.css'],
})
export class AdiantamentoComponent implements OnInit {
  constructor(private invoiceService: DocumentService) {}
  
  ngOnInit() {}

  idNfEntrada : String = "";

  run() {
    let documentLines = new DocumentLine(COD_ITEM, 1, COD_IMPOSTO, 100);
    let document = new PurchaseInvoice('FOR0000490', [documentLines],665);

    document.DocumentInstallments = new Array()
    document.DocumentInstallments.push(new Installment(moment("20/01/2023","DD-MM_YYYY").toDate(),50))
    document.DocumentInstallments.push(new Installment(moment("20/02/2023","DD-MM_YYYY").toDate(),50))
    this.invoiceService.notaFiscalEntrada(document).subscribe((it) => {
      alert('Adiantamento criado');
    });
  }

  getNfEntrada(){
    this.invoiceService.getNotaFiscalEntrada(this.idNfEntrada).subscribe(it =>{
      console.log(it)
    })
  }
}
