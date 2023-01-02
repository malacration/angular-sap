import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
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

  ngOnInit() {
    let pn = new ParceiroNegocio("02.118.203/0001-02","332","665",500,new Date())
    pn.addDocumento("332","665",1550,new Date())
    pn.addDocumento("111","665",1550,new Date())
    console.log(pn.documentosFiscais.length)
    this.dados.push(pn)
  }

  converter(){
    this.importaoToSaoService.parse(this.dados[0])
  }

  fileEvent(fileInput: Event){
    let file = fileInput.target;
    console.log(fileInput.target)
    let fileName = file;
  }

  onFileSelect(input) {
    console.log(input.files);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.readAsText = (blob: Blob, encoding?: string) =>{
        console.log(blob)
      }

      console.log(input.files[0].Blob)
      reader.onload = (e: any) => {
        let str = (e.target.result as String)
        let nova = str.replace("data:text/csv;base64,","")
        let csv = Buffer.from(nova, 'base64').toString('binary')
        console.log()
        
        let csvToRowArray = csv.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(";");
              console.log(row)
            }
      }
      reader.DONE
      reader.readAsDataURL(input.files[0]);
    }
  }


  enviarCsv() {

  }

}
