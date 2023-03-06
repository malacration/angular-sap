import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable()
export class BusinessPartnersService {
  constructor(private config: ConfigService, private http: HttpClient) {}
  host = this.config.host;

  get(id : String): Observable<String> {
    let url = this.host + '/b1s/v1/BusinessPartners?$filter=CardCode eq '+"'"+id+"'"
    return this.http.get<any>(url);
  }



  getFornecedorByCpfCnpj(cpfCnpj : String): Observable<string> {
    return this.getCardCodeByCnpjAndSeries(cpfCnpj,'S')
  }

  getClienteByCpfCnpj(cpfCnpj : String): Observable<string> {
    return this.getCardCodeByCnpjAndSeries(cpfCnpj,'C')
  }

  getCardCodeByCnpjAndSeries(cpfCnpj : String, cardType : String): Observable<string> {
    let isCpf = false;

    if(cpfCnpj.length == 14)
      isCpf =true
    else if(cpfCnpj.length == 18)
      isCpf = false
    else
      return throwError(() => "O valor informado não tem o tamanho adequado de um cpf ou cnpj (contando mascara)"+cpfCnpj)

    let crossJoin = '$crossjoin(BusinessPartners,BusinessPartners/BPFiscalTaxIDCollection)'
    let expand = '?$expand=BusinessPartners($select=CardCode),BusinessPartners/BPFiscalTaxIDCollection($select=BPCode,TaxId0,TaxId4)'
    let filter = '&$filter=BusinessPartners/CardCode eq BusinessPartners/BPFiscalTaxIDCollection/BPCode '
    
    let cnpj = ' (BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj+'\''
    let cnpj2 = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId0 eq \''+cpfCnpj.replace(/[^\d]/g,"")+'\')'

    let cpf = ' (BusinessPartners/BPFiscalTaxIDCollection/TaxId4 eq \''+cpfCnpj+'\''
    let cpf2 = ' or BusinessPartners/BPFiscalTaxIDCollection/TaxId4 eq \''+cpfCnpj.replace(/[^\d]/g,"")+'\')'
    
    let final = ' BusinessPartners/CardType eq \''+cardType+'\' and BusinessPartners/Valid eq \'tYES\''
    let mf
    if(isCpf)
      mf=cpf+cpf2
    else
      mf=cnpj+cnpj2
    
      // mf = ' ('+cpf+cpf2+' or '+cnpj+cnpj2+') '

    let url = this.host + '/b1s/v1/'+crossJoin+expand+filter+' and '+mf+' and '+final
    return this.http.get<any>(url).pipe(map(
        n => n.value.sort((a,b) => 
        a.BusinessPartners.CardCode.localeCompare(b.BusinessPartners.CardCode))[0].BusinessPartners.CardCode));
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
