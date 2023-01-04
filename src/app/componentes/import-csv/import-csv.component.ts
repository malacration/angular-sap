import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import * as moment from 'moment';
import { MaskApplierService } from 'ngx-mask';
import { ParceiroNegocio } from 'src/app/model/importacao/parceiro-negocio';
import { BusinessPartnersService } from 'src/app/service/business-partners.service';
import { FiliaisService } from 'src/app/service/filiais.service';
import { ImportacaoToSap } from 'src/app/service/importao-to-sap.service';
import { DocumentService } from '../../service/document-service'


@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css'],
})
export class ImportCsvComponent implements OnInit {

  constructor(private importaoToSaoService : ImportacaoToSap, 
    private maskService: MaskApplierService,
    private bussinesPartners : BusinessPartnersService,
    private filialService : FiliaisService,
    private documentoService : DocumentService
    ) {}
  dados : Array<ParceiroNegocio> = new Array()
  csvToRowArray : string[]

  ngOnInit() {
  }

  validarParceiro(){
    this.dados.filter(it => it && it.cpfCnpj).forEach(it =>{
      this.bussinesPartners.getFornecedorByCpfCnpj(it.cpfCnpj).subscribe(resposta => {
        it.codSap = resposta.toString()
      })
    })
  }

  validarCliente(){
    this.dados.forEach(it =>{
      this.bussinesPartners.getClienteByCpfCnpj(it.cpfCnpj).subscribe(resposta => {
        it.codSap = resposta.toString()
      })
    })
  }

  limpar(){
    this.dados = this.dados.filter(it => it.codSap == "?")
  }

  carregarCsv(){
    let cpfParceiro = 2;
    let numDocumentoFiscal = 3;
    let cnfpjFilial = 0;
    let valor = 1;
    let dataVencimento = 4;
    this.dados = new Array()

    for (let index = 1; index < this.csvToRowArray.length; index++) {
      let row = this.csvToRowArray[index].split(";");
      let cpfCnpj = ""
      // if(row[cpfParceiro].length == 14)
      //   cpfCnpj = this.maskService.applyMask(row[cpfParceiro],"99.999.999/9999-99")
      // else if(row[cpfParceiro].length == 11)
      //   cpfCnpj = this.maskService.applyMask(row[cpfParceiro],"999.999.999-99")
      // else
      cpfCnpj = row[cpfParceiro]
      if(cpfCnpj){
        let dadosFiltrado = this.dados.filter(it => it.cpfCnpj == cpfCnpj)
        if(dadosFiltrado.length == 1){
          dadosFiltrado[0].addDocumento(new Number(row[numDocumentoFiscal]).valueOf(),
            row[cnfpjFilial],
            new Number(row[valor]).valueOf(),
            moment(row[dataVencimento],"YYYY-MM-DD").toDate())
        }
        else{
          this.dados.push(new ParceiroNegocio(
            cpfCnpj,
            new Number(row[numDocumentoFiscal]).valueOf(),
            row[cnfpjFilial],
            new Number(row[valor]).valueOf(),
            moment(row[dataVencimento],"YYYY-MM-DD").toDate()))
        }
      }
    }
  }

  onFileSelect(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        let str = (e.target.result as String)
        let nova = str.replace("data:text/csv;base64,","")
        let csv = Buffer.from(nova, 'base64').toString('binary')
        this.csvToRowArray = csv.split("\n");
      }
      reader.DONE
      reader.readAsDataURL(input.files[0]);
    }
  }

  cadastrarAllNfEntrada(){
    this.dados.filter(it => it.codSap != "?").forEach(it => {
      try{
        this.cadastrarNfEntrada(it)
      }catch(error){
        it.error = error;
      }
    })    
  }

  cadastrarNfEntrada(it : ParceiroNegocio){
    this.importaoToSaoService.parse(it).subscribe(resul => {
      resul.forEach(nf => {
        try{
          this.filialService.getByCnpj(nf.cnpjFilial).subscribe(filialCod => {
            nf.BPL_IDAssignedToInvoice = filialCod.BPLID;
            nf.DocumentLines[0].WarehouseCode = filialCod.DefaultWarehouseID;
            this.bussinesPartners.updateFiliais(nf.CardCode,filialCod.BPLID).subscribe(
              () => {
                this.documentoService.cadastrarNotaFiscalEntrada(nf).subscribe(it =>{
                  it.error = "Nota cadastrada com sucesso"
                },
                (err) => {
                  if(err && !err.error.error.message.value.includes('já existe'))
                    it.error = err.error.error.message.value
                  else if(!it.error)
                    it.error = "Notas já cadastrada"
                })
            })
          })
        }catch(e){
          console.log("erro cadastra nf")
        }
        
      })
    })
  }

  cadastrarAllNfSaida(){
    this.dados.filter(it => it.codSap != "?").forEach(it => {
      try{
        this.cadastrarNfSaida(it)
      }catch(error){
        it.error = error;
      }
    })    
  }

  cadastrarNfSaida(it : ParceiroNegocio){
    this.importaoToSaoService.parseCliente(it).subscribe(resul => {
      resul.forEach(nf => {
        try{
          this.filialService.getByCnpj(nf.cnpjFilial).subscribe(filialCod => {
            nf.BPL_IDAssignedToInvoice = filialCod.BPLID;
            nf.DocumentLines[0].WarehouseCode = filialCod.DefaultWarehouseID;
            this.bussinesPartners.updateFiliais(nf.CardCode,filialCod.BPLID).subscribe(
              () => {
                this.documentoService.cadastrarNotaFiscalSaida(nf).subscribe(it =>{
                  it.error = "Nota cadastrada com sucesso"
                },
                (err) => {
                  if(err && !err.error.error.message.value.includes('já existe'))
                    it.error = err.error.error.message.value
                  else if(!it.error)
                    it.error = "Notas já cadastrada"
                })
            })
          })
        }catch(e){
          console.log("erro cadastra nf")
        }
        
      })
    })
  }

  totalDados(){
    return this.dados
      .flatMap(it => it.documentosFiscais)
      .map(doc => doc.getTotais())
      .reduce((sum, current) => sum + current, 0)
  }

  showErro(pn){
      console.log(pn.error)
  }

  verificaTotal(pn : ParceiroNegocio){
    this.importaoToSaoService.parseCliente(pn).subscribe(it => {
      console.log(it)
    })
  }

}
