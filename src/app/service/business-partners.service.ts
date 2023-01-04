import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable()
export class BusinessPartnersService {
  constructor(private config: ConfigService, private http: HttpClient) {}
  host = this.config.getHost();

  get(id : String): Observable<String> {
    let url = this.host + '/b1s/v1/BusinessPartners?$filter=CardCode eq '+"'"+id+"'"
    return this.http.get<any>(url);
  }



  getFornecedorByCpfCnpj(cpfCnpj : String): Observable<String> {
    let crossJoin = '$crossjoin(BusinessPartners,BusinessPartners/BPFiscalTaxIDCollection)'
    let expand = '?$expand=BusinessPartners($select=CardCode,GroupCode,Series),BusinessPartners/BPFiscalTaxIDCollection($select=BPCode,TaxId0)'
    let filter = '&$filter=BusinessPartners/CardCode eq BusinessPartners/BPFiscalTaxIDCollection/BPCode '
    let filter1 = ' and (BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj+'\''
    let filter2 = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId4 eq \''+cpfCnpj+'\''
    let semPontos = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj.replace(/[^\d]/g,"")+'\''
    let semPonto2 = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId4 eq \''+cpfCnpj.replace(/[^\d]/g,"")+'\') and BusinessPartners/Series eq 78 '
    let url = this.host + '/b1s/v1/'+crossJoin+expand+filter+filter1+filter2+semPontos+semPonto2
    return this.http.get<any>(url).pipe(map(n => n.value[0].BusinessPartners.CardCode));
  }

  getClienteByCpfCnpj(cpfCnpj : String): Observable<String> {
    let crossJoin = '$crossjoin(BusinessPartners,BusinessPartners/BPFiscalTaxIDCollection)'
    let expand = '?$expand=BusinessPartners($select=CardCode,GroupCode,Series),BusinessPartners/BPFiscalTaxIDCollection($select=BPCode,TaxId0)'
    let filter = '&$filter=BusinessPartners/CardCode eq BusinessPartners/BPFiscalTaxIDCollection/BPCode '
    let filter1 = ' and (BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj+'\''
    let filter2 = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId4 eq \''+cpfCnpj+'\') and BusinessPartners/Series eq 77'
    let url = this.host + '/b1s/v1/'+crossJoin+expand+filter+filter1+filter2
    return this.http.get<any>(url).pipe(map(n => n.value[0].BusinessPartners.CardCode));
  }

  updateFiliais(cardCode : String, filialId : number){
    let url = this.host+"/b1s/v1/BusinessPartners('"+cardCode+"')"
    let body = {
      BPBranchAssignment : [
        {
          "BPCode" : cardCode,
          "BPLID" : filialId,
          "DisabledForBP" : "tNO"
        }
      ]
    }
    return this.http.patch(url,body).pipe(catchError(err => of([])));
  }

  
}
