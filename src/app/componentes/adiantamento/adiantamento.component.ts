import { Component, OnInit } from '@angular/core';
import { DocumentLine } from '../../model/document-line';
import { DocumentPayment } from '../../model/document-payment';
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
    let document = new DocumentPayment('FOR0000490', [documentLines]);
    this.adiantamentoService.create(document).subscribe((it) => {
      alert('Adiantamento criado');
    });
  }

  aprovar() {
    this.adiantamentoService.aprovar().subscribe((it) => {
      alert('aprovação completa');
    });
  }
}
