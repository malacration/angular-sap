import { DownPayment } from "./adiantamentos/Down-Payment";
import { PurchaseDownPayment } from "./adiantamentos/purchase-down-Payment";



export class Payment {

    CardCode : string;
    CashAccount : string
    DocDate : "2022-12-31";
    TransferDate : "2022-12-31";
    CashSum : number
    PaymentInvoices : PaymentInvoices[] = new Array();
    DocType : DocTypeEnum
    BPLID : number

    constructor(cardCode : string, BPLID: number, CashSum : number, documentDocEntry : number){
        this.CardCode = cardCode;
        this.CashSum = CashSum;
        
        let invoiceType = ''
        this.BPLID = BPLID
        if(cardCode.split("FOR").length == 2){
            invoiceType = 'it_PurchaseDownPayment'
            this.DocType = DocTypeEnum.rSupplier
            this.CashAccount = "2.9.1.001.00007"
        }
        else if(cardCode.split("CLI").length == 2){
            invoiceType = 'it_DownPayment'
            this.DocType = DocTypeEnum.rCustomer
            this.CashAccount = "1.9.1.001.00002"
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