import { Component, OnInit } from '@angular/core';
import { BusinessPartnersService } from 'src/app/service/business-partners.service';
import { FiliaisService } from 'src/app/service/filiais.service';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  styleUrls: ['./filiais.component.css'],
})
export class FiliaisComponent implements OnInit {
  constructor(private filiaisService: FiliaisService, private businesPartnersService : BusinessPartnersService) {}

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
    this.businesPartnersService.getByCpfCnpj(this.cnpj).subscribe((it) => {
      console.log(it);
    });
  }
}
