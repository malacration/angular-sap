import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Installment } from 'src/app/model/installment';
import { PurchaseInvoice } from 'src/app/model/purchase-Invoice';
import { DocumentLine } from '../../model/document-line';
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
    let documentLines = new DocumentLine('USO0000402', 1, "2101-009", 100);
    let document = new PurchaseInvoice('FOR0000490', [documentLines]);

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
