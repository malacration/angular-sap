import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DocTypeEnum, Payment } from "../model/sap/payment";
import { ConfigService } from "./config-service";



@Injectable()
export class PaymentService{

    constructor(private http: HttpClient, private config: ConfigService) {}

    host = this.config.host;


    apply(payment : Payment){
        if(payment.DocType == DocTypeEnum.rCustomer)
            return this.contasReceber(payment)
        else if(payment.DocType == DocTypeEnum.rSupplier)
            return this.contasPagar(payment)
    }

    contasReceber(payment : Payment){
        let url = this.host + '/b1s/v1/IncomePayments';
        return this.http.post<String>(url, document);
    }

    contasPagar(payment : Payment){
        let url = this.host + '/b1s/v1/VendorPayments';
        return this.http.post<String>(url, document);
    }

}

