import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import * as moment from 'moment';
import { ParceiroNegocio } from 'src/app/model/importacao/parceiro-negocio';
import { ImportacaoToSap } from 'src/app/service/importao-to-sap.service';



@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css'],
})
export class ImportCsvComponent implements OnInit {

  constructor(private importaoToSaoService : ImportacaoToSap) {}
  dados : Array<ParceiroNegocio> = new Array()
  csvToRowArray : string[]

  ngOnInit() {
    let pn = new ParceiroNegocio("02.118.203/0001-02",332,"665",500,new Date())
    pn.addDocumento(332,"665",1550,new Date())
    pn.addDocumento(111,"665",1550,new Date())
    this.dados.push(pn)
  }

  converter(){
    this.importaoToSaoService.parse(this.dados[0])
  }

  carregarCsv(){
    let cpfParceiro = 1;
    let numDocumentoFiscal = 2;
    let cnfpjFilial = 1;
    let valor = 0;
    let dataVencimento = 3;
    this.dados = new Array()

    for (let index = 1; index < this.csvToRowArray.length; index++) {
      let row = this.csvToRowArray[index].split(",");
      let dadosFiltrado = this.dados.filter(it => it.cpfCnpj == row[cpfParceiro])
      if(dadosFiltrado.length == 1){
        dadosFiltrado[0].addDocumento(new Number(row[numDocumentoFiscal]).valueOf(),
          row[cnfpjFilial],
          new Number(row[valor]).valueOf(),
          moment(row[dataVencimento],"YYYY-MM-DD").toDate())
      }
      else{
        this.dados.push(new ParceiroNegocio(
          row[cpfParceiro],
          new Number(row[numDocumentoFiscal]).valueOf(),
          row[cnfpjFilial],
          new Number(row[valor]).valueOf(),
          moment(row[dataVencimento],"YYYY-MM-DD").toDate()))
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

}
