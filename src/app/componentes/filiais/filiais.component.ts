import { Component, OnInit } from '@angular/core';
import { FiliaisService } from 'src/app/service/filiais.service';

@Component({
  selector: 'app-filiais',
  templateUrl: './filiais.component.html',
  styleUrls: ['./filiais.component.css'],
})
export class FiliaisComponent implements OnInit {
  constructor(private filiaisService: FiliaisService) {}

  ngOnInit() {}

  exibir() {
    this.filiaisService.get().subscribe((it) => {
      console.log(it);
    });
  }
}
