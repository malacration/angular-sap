import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './service/config-service';
import { LoginComponent } from './componentes/login/login.component';
import { LoginService } from './service/login-service';
import { AdiantamentoComponent } from './componentes/adiantamento/adiantamento.component';
import { CommonModule } from '@angular/common';
import { PurchaseDownPaymentsService } from './service/purchase-down-payments-service';
import { FiliaisComponent } from './componentes/filiais/filiais.component';
import { FiliaisService } from './service/filiais.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, CommonModule],
  declarations: [
    AppComponent,
    LoginComponent,
    AdiantamentoComponent,
    FiliaisComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    LoginService,
    PurchaseDownPaymentsService,
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
