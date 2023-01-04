import { Component, OnInit } from '@angular/core';
import { PurchaseInvoice } from 'src/app/model/sap/purchase-Invoice';
import { BusinessPartnersService } from 'src/app/service/business-partners.service';
import { DocumentService } from 'src/app/service/document-service';
import { FiliaisService } from 'src/app/service/filiais.service';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  styleUrls: ['./filiais.component.css'],
})
export class FiliaisComponent implements OnInit {
  constructor(private filiaisService: FiliaisService, 
    private businesPartnersService : BusinessPartnersService,
    private documentService : DocumentService) {}

  ngOnInit() {}

  cnpj : String = '';

  exibir() {
    this.filiaisService.get().subscribe((it) => {
      console.log(it);
    });
  }

  exibirByCnpj() {
    this.filiaisService.getByCnpj(this.cnpj).subscribe((it) => {
      console.log(it);
    });
  }

  exibirById() {
    this.businesPartnersService.get(this.cnpj).subscribe((it) => {
      console.log(it);
    });
  }

  parceiro() {
    this.businesPartnersService.getFornecedorByCpfCnpj(this.cnpj).subscribe((it) => {
      console.log(it);
    });
  }

  getInvoice() {
    this.documentService.getNotaFiscalEntrada(this.cnpj).subscribe((it) => {
      console.log(it);
    });
  }
}
