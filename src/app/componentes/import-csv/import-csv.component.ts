import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import * as moment from 'moment';
import { MaskApplierService } from 'ngx-mask';
import { concatAll, delay, from, fromEvent, Observable, of, pipe, share, Subscribable, switchMap, switchMapTo } from 'rxjs';
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
  
  progression = 0
  page = 1
  itemsPerPage = 30
  dados : Array<ParceiroNegocio> = new Array(new ParceiroNegocio("CPF/CNPJ Parcerio",0,"cnpj",0,new Date(),""))
  csvToRowArray : string[]

  public get currentPage() : Array<ParceiroNegocio>  {
    return this.loadPage(this.page)
  }

  ngOnInit() {
    
  }

  loadPage(page){
    return this.dados.slice((this.page-1)*this.itemsPerPage,this.page*this.itemsPerPage)
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

  removerNfs(){
    this.dados = this.dados.filter(it => it.error != "Nota cadastrada com sucesso")
  }

  carregarCsv(){
    let cpfParceiro = 2;
    let numDocumentoFiscal = 3;
    let cnfpjFilial = 0;
    let valor = 1;
    let dataVencimento = 5;
    let nossoNumero = 6;
    this.dados = new Array()

    for (let index = 1; index < this.csvToRowArray.length; index++) {
      let row = this.csvToRowArray[index].split(";");
      let cpfCnpj = ""
      row[cpfParceiro] = row[cpfParceiro].trim();
      if(row[cpfParceiro].length == 14 && row[cpfParceiro].split('.').length ==1)
        cpfCnpj = this.maskService.applyMask(row[cpfParceiro],"99.999.999/9999-99")
      else if(row[cpfParceiro].length == 11 && row[cpfParceiro].split('.').length == 1){
        console.log("aplicando mascara cpf")
        cpfCnpj = this.maskService.applyMask(row[cpfParceiro],"999.999.999-99")
      }
      else
        cpfCnpj = row[cpfParceiro]
      
      let nossoNumero = ''
      if(row[nossoNumero])
        nossoNumero = row[nossoNumero]

      if(cpfCnpj){
        let dadosFiltrado = this.dados.filter(it => it.cpfCnpj == cpfCnpj)
        if(dadosFiltrado.length == 1){
          dadosFiltrado[0].addDocumento(new Number(row[numDocumentoFiscal]).valueOf(),
            row[cnfpjFilial],
            new Number(row[valor]).valueOf(),
            moment(row[dataVencimento],"YYYY-MM-DD").toDate(),nossoNumero)
        }
        else{
          this.dados.push(new ParceiroNegocio(
            cpfCnpj,
            new Number(row[numDocumentoFiscal]).valueOf(),
            row[cnfpjFilial],
            new Number(row[valor]).valueOf(),
            moment(row[dataVencimento],"YYYY-MM-DD").toDate(),nossoNumero))
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
    this.importaoToSaoService.parse(it)
    .subscribe(resul => {
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
                  if(err && (!err.error.error.message.value.includes('já existe') 
                      && !err.error.error.message.value.includes('Nota Fiscal number was already used for a BP')))
                    it.error = err.error.error.message.value
                  else if(!it.error)
                    it.error = "Nota cadastrada com sucesso"
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
                  if(err && (!err.error.error.message.value.includes('já existe') 
                      && !err.error.error.message.value.includes('Nota Fiscal number was already used for a BP')))
                    it.error = err.error.error.message.value
                  else if(!it.error)
                    it.error = "Nota cadastrada com sucesso"
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
      .reduce((sum, current) => sum + current*100, 0)/100
  }

  showErro(pn){
      console.log(pn.error)
  }

  verificaTotal(pn : ParceiroNegocio){
    this.executObservables([this.importaoToSaoService.parseCliente(pn)],it => {console.log(it)})
  }

  requestUm = of('first').pipe(delay(500));
  requestDois = of('first').pipe(delay(500));
  requestTrez = of('first').pipe(delay(500));
  requestQuatro = of('first').pipe(delay(500));

  test(){
    this.executObservables([this.requestUm,this.requestDois,this.requestTrez,this.requestQuatro],it => {console.log(it)})
  }

  executObservables(observables : Array<Observable<any>>,
    funcao : { apply: (expectation: any) => void;} ){
    let completo = 0;
    let requests = from(observables).pipe(concatAll());
    requests.subscribe(it => {
      if(funcao != null)
        funcao.apply(it)
      completo++
      this.progression = (completo/observables.length)*100
    });
  }

}
