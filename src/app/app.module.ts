import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { DatePipe } from '@angular/common';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      timeOut: 2000,
      enableHtml: true
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LandingComponent,
    RegisterComponent,

  ],
  providers: [DatePipe, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
