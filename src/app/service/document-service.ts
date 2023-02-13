import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseDownPayment } from '../model/sap/purchase-down-Payment';
import { PurchaseInvoice } from '../model/sap/purchase-Invoice';
import { ConfigService } from './config-service';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient, private config: ConfigService) {}
  host = this.config.host;

  adiantamentoFornecedor(document: PurchaseDownPayment): Observable<any> {
    let url = this.host + '/b1s/v1/PurchaseDownPayments';
    return this.http.post<String>(url, document);
  }


  getNotaFiscalEntrada(id: String): Observable<any> {
    let url = this.host + '/b1s/v1/PurchaseInvoices?$filter=DocNum eq '+id
    return this.http.get<String>(url);
  }

  cadastrarNotaFiscalEntrada(document: PurchaseInvoice): Observable<any> {
    let url = this.host + '/b1s/v1/PurchaseInvoices';
    return this.http.post<String>(url, document);
  }

  cadastrarNotaFiscalSaida(document: PurchaseInvoice): Observable<any> {
    let url = this.host + '/b1s/v1/Invoices';
    return this.http.post<String>(url, document);
  }

  aprovar(): Observable<any> {
    let url =
      this.host + '/b1s/v1/PurchaseDownPaymentsService_HandleApprovalRequest';
    return this.http.post<String>(url, null);
  }
}
