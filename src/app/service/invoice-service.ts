import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../model/document';

@Injectable()
export class InvoiceService {
  constructor(private http: HttpClient) {}
  host = 'https://localhost:50000';
  url = this.host + '/b1s/v1/InvoicesService_GetApprovalTemplates';

  create(document: Document) {
    return this.http.post<String>(
      'https://hanab1:50000/b1s/v1/Login',
      document
    );
  }
}
