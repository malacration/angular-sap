import { DownPayment } from "./adiantamentos/Down-Payment";
import { PurchaseDownPayment } from "./adiantamentos/purchase-down-Payment";



export class Payment {

    CardCode : string;
    CashAccount : "1.1.1.002.06000"
    DocDate : "2022-12-31";
    CashSum : number
    PaymentInvoices : PaymentInvoices[] = new Array();
    DocType : DocTypeEnum

    constructor(cardCode : string, CashSum : number, documentDocEntry : number){
        this.CardCode = cardCode;
        this.CashSum = CashSum;
        
        let invoiceType = ''
        if(cardCode.split("FOR").length == 2){
            invoiceType = 'it_PurchaseDownPayment'
            this.DocType = DocTypeEnum.rSupplier
        }
        else if(cardCode.split("CLI").length == 2){
            invoiceType = 'it_DownPayment'
            this.DocType = DocTypeEnum.rCustomer
        }
            
        this.PaymentInvoices.push(new PaymentInvoices(documentDocEntry,CashSum,invoiceType))
    }
}

export enum DocTypeEnum{
    rCustomer = 'rCustomer',
    rSupplier = 'rSupplier',
}

export class CashFlowAssignments{
    AmountLC : string;
    PaymentMeans : string;
}

export class PaymentInvoices{
    DocEntry : number
    SumApplied : number
    InvoiceType : string

    constructor(docEntry : number, sumApplied : number, invoiceType : string){
        this.DocEntry = docEntry;
        this.SumApplied = sumApplied;
        this.InvoiceType = invoiceType;
    }
}

// //vendor ]
// {
//     "CardCode": "v001",
//     "CashFlowAssignments": [
//         {
//             "AmountLC": "101",
//             "PaymentMeans": "pmtBankTransfer"
//         }
//     ],
//     "TransferAccount": "_SYS00000000004",
//     "TransferDate": "2014-03-27",
//     "TransferSum": "101"
// }

// // incoming 

// {
//     "CardCode": "c001",
//     "CashAccount": "_SYS00000000002",
//     "CashFlowAssignments": [
//         {
//             "AmountLC": "110",
//             "PaymentMeans": "pmtCash"
//         }
//     ],
//     "CashSum": "110"
// }