import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config-service';

@Injectable()
export class FiliaisService {
  constructor(private config: ConfigService, private http: HttpClient) {}
  host = this.config.getHost();

  get(): Observable<any> {
    let url = this.host + '/b1s/v1/Branches';
    return this.http.get<String>(url);
  }
}
