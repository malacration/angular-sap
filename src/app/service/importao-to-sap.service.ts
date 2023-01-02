import { Injectable } from "@angular/core";
import { ParceiroNegocio } from "../model/importacao/parceiro-negocio";
import { BusinessPartnersService } from "./business-partners.service";
import { FiliaisService } from "./filiais.service";
import {PurchaseInvoice} from "../model/sap/purchase-Invoice"

@Injectable()
export class ImportacaoToSap{

    constructor(private filialService : FiliaisService, private businessPartners : BusinessPartnersService) {}

    
    parse(parceiro : ParceiroNegocio) : Array<PurchaseInvoice>{
        this.businessPartners.getByCpfCnpj(parceiro.cpfCnpj).subscribe(it =>{
            console.log("codigo ",it)
        })
        return null
    }
}