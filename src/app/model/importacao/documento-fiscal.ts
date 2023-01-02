import { Parcela } from "./parcela"



export class DocumentoFiscal{

    numeroDocumento : String
    cnpjFilial : String
    parcelas : Array<Parcela> = new Array()
    
    constructor(numero : String, cnpjFilial : String, valor : number, dataVecimento : Date){
        this.numeroDocumento = numero
        this.cnpjFilial = cnpjFilial
        this.addParcela(valor, dataVecimento)
    }

    addParcela(valor : number, dataVecimento : Date){
        let parcela = new Parcela(valor,dataVecimento)
        this.parcelas.push(parcela)
    }
    
}