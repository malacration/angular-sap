import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentPayment } from '../model/document-payment';
import { ConfigService } from './config-service';

@Injectable()
export class PurchaseDownPaymentsService {
  constructor(private http: HttpClient, private config: ConfigService) {}
  host = this.config.getHost();

  create(document: DocumentPayment): Observable<any> {
    let url = this.host + '/b1s/v1/PurchaseDownPayments';
    return this.http.post<String>(url, document);
  }

  aprovar(): Observable<any> {
    let url =
      this.host + '/b1s/v1/PurchaseDownPaymentsService_HandleApprovalRequest';
    return this.http.post<String>(url, null);
  }
}
