import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable()
export class FiliaisService {
  constructor(private config: ConfigService, private http: HttpClient) {}
  host = this.config.host;

  get(): Observable<any> {
    let url = this.host + '/b1s/v1/BusinessPlaces';
    return this.http.get<String>(url);
  }

  getByCnpj(cnpj : String): Observable<any> {
    let url = this.host + '/b1s/v1/BusinessPlaces?$filter=FederalTaxID eq '+"'"+cnpj+"'"
    return this.http.get<any>(url).pipe(map(it => it.value[0]));
  }
}
