import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable()
export class BusinessPartnersService {
  constructor(private config: ConfigService, private http: HttpClient) {}
  host = this.config.getHost();


  getByCpfCnpj(cpfCnpj : String): Observable<any> {
    let crossJoin = '$crossjoin(BusinessPartners,BusinessPartners/BPFiscalTaxIDCollection)'
    let expand = '?$expand=BusinessPartners($select=CardCode,GroupCode),BusinessPartners/BPFiscalTaxIDCollection($select=BPCode,TaxId0)'
    let filter = '&$filter=BusinessPartners/CardCode eq BusinessPartners/BPFiscalTaxIDCollection/BPCode and BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj+'\''
    let url = this.host + '/b1s/v1/BusinessPlaces?'+crossJoin+expand+filter
    return this.http.get<String>(url).pipe(it => it['value']);
  }
}
