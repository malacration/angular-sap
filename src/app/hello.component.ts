import { Component, Input } from '@angular/core';
import { ConfigService } from './service/config-service';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1> <h2>{{host}}</h2>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent {
  constructor(private config: ConfigService) {}
  @Input() name: string;
  host = this.config.getHost();
}
