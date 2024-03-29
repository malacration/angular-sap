import { Installment } from "../sap/installment";

export class Parcela{
    valor : number
    dataVencimento : Date
    U_LinhaDigitavel : String = ''

    constructor(valor : number, dataVecimento : Date, U_LinhaDigitavel : String){
        this.valor = valor;
        this.dataVencimento = dataVecimento
        this.U_LinhaDigitavel = U_LinhaDigitavel
    }

    get() : Installment {
        return new Installment(new Date(2022, 11, 31),this.valor,this.U_LinhaDigitavel)
    }
}