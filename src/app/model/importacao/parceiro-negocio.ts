import { DocumentoFiscal } from "./documento-fiscal"


export class ParceiroNegocio{
    
    cpfCnpj : String
    documentosFiscais : Array<DocumentoFiscal> = new Array()
    isCollapsed = true;
    codSap = "?"
    error = "" 
    
    constructor(cpfCnpj : String, numeroDocumentoFiscal : number, cnpjFilial : String, valor : number, dataVecimento : Date, nossoNumero : String){
        this.cpfCnpj = cpfCnpj
        this.isCollapsed = true;
        this.addDocumento(numeroDocumentoFiscal,cnpjFilial,valor, dataVecimento,nossoNumero)
    }

    addDocumento(numero : number, cnpjFilial : String,valor : number, dataVecimento : Date,nossoNumero : String){
        let filtro = this.documentosFiscais.filter(it => it.numeroDocumento == numero)
        if(filtro.length == 0)
            this.documentosFiscais.push(new DocumentoFiscal(numero.valueOf(),cnpjFilial,valor,dataVecimento,nossoNumero))
        else
            filtro[0].addParcela(valor,dataVecimento,nossoNumero)
    }

    getTotais() : number {
        return this.documentosFiscais.map(it => it.getTotais()).reduce((sum, current) => sum + current*100, 0)/100
    }
}