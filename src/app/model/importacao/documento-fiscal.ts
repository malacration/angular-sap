import { DocumentLine } from "../sap/document-line"
import { PurchaseInvoice } from "../sap/purchase-Invoice"
import { COD_IMPOSTO, COD_ITEM } from "./constantes"
import { Parcela } from "./parcela"



export class DocumentoFiscal{

    numeroDocumento : number
    cnpjFilial : String
    parcelas : Array<Parcela> = new Array()
    
    constructor(numero : number, cnpjFilial : String, valor : number, dataVecimento : Date){
        this.numeroDocumento = numero
        this.cnpjFilial = cnpjFilial
        this.addParcela(valor, dataVecimento)
    }

    addParcela(valor : number, dataVecimento : Date){
        let parcela = new Parcela(valor,dataVecimento)
        this.parcelas.push(parcela)
    }

    getPurchaseInvoice(cardCode : String) : PurchaseInvoice{
        let docLines = new Array()
        let total = this.parcelas.map(it => it.valor).reduce((sum, current) => sum + current, 0)
        docLines.push(new DocumentLine(COD_ITEM,1,COD_IMPOSTO,total))
        let document = new PurchaseInvoice(cardCode,docLines,this.numeroDocumento,this.cnpjFilial)
        document.DocumentInstallments = this.parcelas.map(it => it.get())
        return document
    }
    
}