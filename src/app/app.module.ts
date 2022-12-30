import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './service/config-service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
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
