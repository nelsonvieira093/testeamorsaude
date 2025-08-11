import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { AuthInterceptor } from './core/auth/auth.interceptor';

// Features Components (assumindo que são standalone!)
import { ClinicViewComponent } from './features/clinics/view/clinic-view.component';
import { ClinicsListComponent } from './features/clinics/list/clinics-list.component';
import { ClinicFormComponent } from './features/clinics/form/clinic-form.component';
import { LoginComponent } from './features/auth/login/login.component';

// Shared Components (standalone)
import { LoadingComponent } from './shared/components/loading/loading.component';
import { TableComponent } from './shared/components/table/table.component';
import { FormFieldComponent } from './shared/components/form-field/form-field.component';
import { SharedModule } from './shared/shared.module';

// Defina as rotas da aplicação aqui
import { Routes } from '@angular/router';

const routes: Routes = [
  // Exemplo de rota:
  // { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppComponent,
    ClinicViewComponent,
    ClinicsListComponent,
    ClinicFormComponent,
    LoginComponent,
    LoadingComponent,
    TableComponent,
    FormFieldComponent,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
})
export class AppModule { }