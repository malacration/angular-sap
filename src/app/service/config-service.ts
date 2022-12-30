import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private host = 'sem-host';

  getHost(): String {
    return this.host;
  }
}
