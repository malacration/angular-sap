import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private host = 'https://hanab1:50000';

  getHost(): String {
    return this.host;
  }
}
