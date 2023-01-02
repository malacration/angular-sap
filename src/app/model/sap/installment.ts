


export class Installment{
    DueDate : Date
    Total : number
    constructor(vencimento : Date, total : number){
        this.DueDate = vencimento;
        this.Total = total;
    }
    // InstallmentId
}

// "DocumentInstallments" : [
//     {
//        "DueDate" : "2023-01-02",
//        "Percentage" : 100.0,
//        "Total" : 100.0,
//        "LastDunningDate" : null,
//        "DunningLevel" : 0,
//        "TotalFC" : 0.0,
//        "InstallmentId" : 1,
//        "PaymentOrdered" : "tNO",
//        "U_IB_FormaPgto" : null,
//        "U_CodigoDeBarras" : null,
//        "U_LinhaDigitavel" : null,
//        "U_TX_tBand" : null,
//        "U_TX_cAut" : null,
//        "U_IB_TipoImposto" : "0",
//        "U_IB_GerarBoleto" : "1",
//        "U_QrCodePix" : null
//     }
//   ]