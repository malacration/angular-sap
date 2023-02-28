import * as moment from "moment";
import { MaskApplierService } from 'ngx-mask';
import { ParceiroNegocio } from "./parceiro-negocio";

export class CarregaCsv{
    
    constructor(private maskService: MaskApplierService){

    }
    
    carrega(csvToRowArray : string[]){
        let cpfParceiro = 2;
        let numDocumentoFiscal = 3;
        let cnfpjFilial = 0;
        let valor = 1;
        let dataVencimento = 5;
        let nossoNumeroRow = 6;
        let dados = new Array()
        let filial = '';
        
        for (let index = 1; index < csvToRowArray.length; index++) {
            try{
                let row = csvToRowArray[index].split(";");
                let cpfCnpj = ""

                cpfCnpj = this.validaCpfCnpj(row[cpfParceiro])
                filial = this.validaCpfCnpj(row[cnfpjFilial])

                let nossoNumero = ''
                if(row[nossoNumeroRow])
                    nossoNumero = row[nossoNumeroRow].trim()

                if(cpfCnpj){
                    let dadosFiltrado = dados.filter(it => it.cpfCnpj == cpfCnpj)
                    if(dadosFiltrado.length == 1){
                    dadosFiltrado[0].addDocumento(new Number(row[numDocumentoFiscal]).valueOf(),
                        filial,
                        new Number(row[valor]).valueOf(),
                        moment(row[dataVencimento],"YYYY-MM-DD").toDate(),nossoNumero)
                    }
                    else{
                    dados.push(new ParceiroNegocio(
                        cpfCnpj,
                        new Number(row[numDocumentoFiscal]).valueOf(),
                        filial,
                        new Number(row[valor]).valueOf(),
                        moment(row[dataVencimento],"YYYY-MM-DD").toDate(),nossoNumero))
                    }
                }
            }catch(e){
                alert("Erro na linha "+index+1)
                console.log(e)
            }
        }
        return dados
    }


    validaCpfCnpj(cpfjParceiro : string) : string{
        if(!cpfjParceiro)
            cpfjParceiro = 'Sem Valor'
        cpfjParceiro = cpfjParceiro.trim()
        let cpfCnpj = cpfjParceiro
        if(cpfjParceiro.length == 14 && cpfjParceiro.split('.').length == 1)
                cpfCnpj = this.maskService.applyMask(cpfjParceiro,"99.999.999/9999-99")
        else if(cpfjParceiro.length == 11 && cpfjParceiro.split('.').length == 1){
            console.log("aplicando mascara cpf")
            cpfCnpj = this.maskService.applyMask(cpfjParceiro,"999.999.999-99")
        }
        return cpfCnpj
    }
}