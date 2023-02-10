import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private host = 'https://sapharovema:50000';

  getHost(): String {
    return this.host;
  }
}
