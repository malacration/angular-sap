
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './service/config-service';
import { LoginComponent } from './componentes/login/login.component';
import { LoginService } from './service/login-service';
import { CommonModule } from '@angular/common';
import { DocumentService } from './service/document-service';
import { DeBugComponent } from './componentes/debug/debug.component';
import { FiliaisService } from './service/filiais.service';
import { BusinessPartnersService } from './service/business-partners.service';
import { ImportCsvComponent } from './componentes/import-csv/import-csv.component';
import { ImportacaoToSap } from './service/importao-to-sap.service';
import { NgbAccordionModule, NgbCollapseModule, NgbPaginationModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { IConfig, MaskApplierService, NgxMaskModule } from 'ngx-mask'
import { SessionInterceptor } from './session.Interceptor';
import { PaymentService } from './service/payment.service';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  imports: [BrowserModule, FormsModule, 
    HttpClientModule,
    CommonModule,
    NgbCollapseModule,
    NgxMaskModule.forRoot(),
    NgbPaginationModule,
    NgbAccordionModule,
    NgbProgressbarModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DeBugComponent,
    ImportCsvComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
    LoginService,
    FiliaisService,
    DocumentService,
    BusinessPartnersService,
    PaymentService,
    ImportacaoToSap,
    MaskApplierService,
    {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
    {
      provide: ConfigService,
      useFactory: (it) => {
        // @ts-ignore
        return Object.assign(new ConfigService(), window['app-config']);
      },
    },
  ],
})
export class AppModule {}
