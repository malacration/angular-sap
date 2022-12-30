import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentPayment } from '../model/document-payment';

@Injectable()
export class PurchaseDownPaymentsService {
  constructor(private http: HttpClient) {}

  host = 'https://localhost:50000';
  url = this.host + '/b1s/v1/PurchaseDownPaymentsService_GetApprovalTemplates';

  create(document: DocumentPayment) {
    return this.http.post<String>(
      'https://hanab1:50000/b1s/v1/Login',
      document
    );
  }
}
