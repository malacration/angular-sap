import { Component, OnInit } from '@angular/core';
import { BusinessPartnersService } from 'src/app/service/business-partners.service';
import { DocumentService } from 'src/app/service/document-service';
import { FiliaisService } from 'src/app/service/filiais.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css'],
})
export class DeBugComponent implements OnInit {
  constructor(private filiaisService: FiliaisService, 
    private businesPartnersService : BusinessPartnersService,
    private documentService : DocumentService) {}

  ngOnInit() {}

  cnpj : String = '';

  resultado = ''

  exibir() {
    this.filiaisService.get().subscribe((it) => {
      console.log(it);
      this.resultado = it.toString()
    });
  }

  exibirByCnpj() {
    this.filiaisService.getByCnpj(this.cnpj).subscribe((it) => {
      console.log(it);
      this.resultado = it.toString()
    });
  }

  exibirById() {
    this.businesPartnersService.get(this.cnpj).subscribe((it) => {
      console.log(it);
      this.resultado = it.toString()
    });
  }

  parceiro() {
    this.businesPartnersService.getFornecedorByCpfCnpj(this.cnpj).subscribe((it) => {
      console.log(it);
      this.resultado = it.toString()
    });
  }

  getInvoice() {
    this.documentService.getNotaFiscalEntrada(this.cnpj).subscribe((it) => {
      console.log(it);
      this.resultado = it.toString()
    });
  }
}
