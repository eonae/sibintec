import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { StatusComponent } from './pages/status/status.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ApiService } from './services/api.service';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PaymentComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options)
  ],
  providers: [
    HttpClient,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
