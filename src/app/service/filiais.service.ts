import { Injectable } from '@angular/core';
import { ConfigService } from './config-service';

@Injectable()
export class FiliaisService {
  constructor(private config: ConfigService) {}

  getFiliais() {}
}
