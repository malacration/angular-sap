import { PurchaseDownPayment } from "../sap/adiantamentos/purchase-down-Payment"
import { DocumentLine } from "../sap/document-line"
import { Document } from "../sap/document"
import { PurchaseInvoice } from "../sap/purchase-Invoice"
import { COD_IMPOSTO, COD_ITEM } from "./constantes"
import { Parcela } from "./parcela"
import { DownPayment } from "../sap/adiantamentos/Down-Payment"



export class DocumentoFiscal{

    numeroDocumento : number
    cnpjFilial : String
    parcelas : Array<Parcela> = new Array()
    
    constructor(numero : number, cnpjFilial : String, valor : number, dataVecimento : Date, nossoNumero : String){
        this.numeroDocumento = numero
        this.cnpjFilial = cnpjFilial
        this.addParcela(valor, dataVecimento,nossoNumero)
    }

    addParcela(valor : number, dataVecimento : Date, nossoNumero : String){
        let parcela = new Parcela(valor,dataVecimento,nossoNumero)
        this.parcelas.push(parcela)
    }

    getDocument(cardCode : String) : Document{
        let docLines = new Array()
        let total = this.parcelas.map(it => it.valor).reduce((sum, current) => sum + current*100, 0)/100
        docLines.push(new DocumentLine(COD_ITEM,1,COD_IMPOSTO,total))
        let document = new Document(cardCode,docLines,this.numeroDocumento,this.cnpjFilial)
        document.DocumentInstallments = this.parcelas.map(it => it.get())
        return document

    }

    getPurchaseInvoice(cardCode : String) : PurchaseInvoice{
        let document = new PurchaseInvoice(this.getDocument(cardCode))
        return document
    }

    getInvoice(cardCode : String) : PurchaseInvoice{
        let invoice = this.getPurchaseInvoice(cardCode);
        invoice.SequenceCode -1;
        return invoice;
    }


    getPurchaseDownPayment(cardCode : String) : PurchaseDownPayment{
        return new PurchaseDownPayment(this.getDocument(cardCode));
    }

    getDownPayment(cardCode : String) : DownPayment{
        return new DownPayment(this.getDocument(cardCode));
    }

    getTotais() : number {
        return this.parcelas.map(it => it.valor).reduce((sum, current) => sum + current*100, 0)/100
    }
    
}