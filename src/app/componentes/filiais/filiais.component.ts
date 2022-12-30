import { Component, OnInit } from '@angular/core';
import { PurchaseDownPaymentsService } from 'src/app/service/purchase-down-payments-service';
//import { FiliaisService } from 'src/app/service/filiais.service';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  styleUrls: ['./filiais.component.css'],
})
export class FiliaisComponent implements OnInit {
  constructor(private adiantamentoService: PurchaseDownPaymentsService) {}

  ngOnInit() {}

  exibir() {
    //this.filiaisService.get().subscribe((it) => {
    //  console.log(it);
    //});
  }
}
