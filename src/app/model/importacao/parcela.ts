import { Installment } from "../sap/installment";

export class Parcela{
    valor : number
    dataVencimento : Date

    constructor(valor : number, dataVecimento : Date){
        this.valor = valor;
        this.dataVencimento = dataVecimento
    }

    get() : Installment{
        return new Installment(this.dataVencimento,this.valor)
    }
}