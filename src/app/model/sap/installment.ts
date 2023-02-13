


export class Installment{
    DueDate : Date
    Total : number
    U_LinhaDigitavel : String
    constructor(vencimento : Date, total : number, U_LinhaDigitavel : String){
        this.DueDate = vencimento;
        this.Total = total;
        this.U_LinhaDigitavel = U_LinhaDigitavel
    }
    // InstallmentId
}