import { Component, OnInit } from '@angular/core';
import { DocumentLine } from '../../model/document-line';
import { PurchaseDownPayment } from '../../model/purchase-down-Payment';
import { PurchaseDownPaymentsService } from '../../service/purchase-down-payments-service';

@Component({
  selector: 'app-adiantamento',
  templateUrl: './adiantamento.component.html',
  styleUrls: ['./adiantamento.component.css'],
})
export class AdiantamentoComponent implements OnInit {
  constructor(private adiantamentoService: PurchaseDownPaymentsService) {}

  ngOnInit() {}

  run() {
    let documentLines = new DocumentLine('USO0000078', 1, null, 100);
    let document = new PurchaseDownPayment('FOR0000490', [documentLines]);
    this.adiantamentoService.create(document).subscribe((it) => {
      alert('Adiantamento criado');
    });
  }
}
