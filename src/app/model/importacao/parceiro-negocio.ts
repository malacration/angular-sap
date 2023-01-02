import { DocumentoFiscal } from "./documento-fiscal"


export class ParceiroNegocio{
    
    cpfCnpj : String
    documentosFiscais : Array<DocumentoFiscal> = new Array()
    isCollapsed = true;
    codSap = "?"
    
    constructor(cpfCnpj : String, numeroDocumentoFiscal : number, cnpjFilial : String, valor : number, dataVecimento : Date){
        this.cpfCnpj = cpfCnpj
        this.isCollapsed = true;
        this.addDocumento(numeroDocumentoFiscal,cnpjFilial,valor, dataVecimento)
    }

    addDocumento(numero : number, cnpjFilial : String,valor : number, dataVecimento : Date){
        let filtro = this.documentosFiscais.filter(it => it.numeroDocumento == numero)
        if(filtro.length == 0)
            this.documentosFiscais.push(new DocumentoFiscal(numero.valueOf(),cnpjFilial,valor,dataVecimento))
        else
            filtro[0].addParcela(valor,dataVecimento)
    }
}