import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private host = 'https://saphaslrovema:50000';

  getHost(): String {
    return this.host;
  }
}
