import { Injectable } from "@angular/core";
import { ParceiroNegocio } from "../model/importacao/parceiro-negocio";
import { BusinessPartnersService } from "./business-partners.service";
import { FiliaisService } from "./filiais.service";
import {PurchaseInvoice} from "../model/sap/purchase-Invoice"
import { map, Observable } from "rxjs";
import { PurchaseDownPayment } from "../model/sap/adiantamentos/purchase-down-Payment";
import { DownPayment } from "../model/sap/adiantamentos/Down-Payment";

@Injectable()
export class ImportacaoToSap{

    constructor(private filialService : FiliaisService, private businessPartners : BusinessPartnersService) {}

    parse(parceiro : ParceiroNegocio) : Observable<Array<PurchaseInvoice>> {
        return this.businessPartners.getFornecedorByCpfCnpj(parceiro.cpfCnpj)
        .pipe(map(cardCode => 
            parceiro.documentosFiscais.map(it => it.getPurchaseInvoice(cardCode))
        ))
    }

    parseCliente(parceiro : ParceiroNegocio) : Observable<Array<PurchaseInvoice>> {
        return this.businessPartners.getClienteByCpfCnpj(parceiro.cpfCnpj)
        .pipe(map(cardCode => 
            parceiro.documentosFiscais.map(it => it.getInvoice(cardCode))
        ))
    }

    parseAdiantamentoFornecedor(parceiro : ParceiroNegocio) : Observable<Array<PurchaseDownPayment>> {
        return this.businessPartners.getFornecedorByCpfCnpj(parceiro.cpfCnpj)
        .pipe(map(cardCode => 
            parceiro.documentosFiscais.map(it => it.getPurchaseDownPayment(cardCode))
        ))
    }

    parseAdiantamentoCliente(parceiro : ParceiroNegocio) : Observable<Array<DownPayment>> {
        return this.businessPartners.getFornecedorByCpfCnpj(parceiro.cpfCnpj)
        .pipe(map(cardCode => 
            parceiro.documentosFiscais.map(it => it.getDownPayment(cardCode))
        ))
    }
}