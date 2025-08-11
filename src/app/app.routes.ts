import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';


import { ClinicsListComponent } from './features/clinics/list/clinics-list.component';
import { ClinicFormComponent } from './features/clinics/form/clinic-form.component';
import { ClinicViewComponent } from './features/clinics/view/clinic-view.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { TableExampleComponent } from './features/table-example/table-example.component';
import { ClinicEditComponent } from './features/clinics/edit/clinic-edit.component';


export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {   
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full', 
  },
  {
    path: 'clinics/:id/edit',
    component: ClinicEditComponent
  },
  { path: 'form-example', component: ClinicFormComponent },
  { path: '', redirectTo: 'form-example', pathMatch: 'full' },
  {
    path: 'clinics',
    //canActivate: [AuthGuard],  
    children: [
      { path: '', component: ClinicsListComponent },
      { path: 'new', component: ClinicFormComponent },
      { path: ':id', component: ClinicViewComponent },
      { path: ':id/edit', component: ClinicFormComponent },
      { path: 'loading-test', component: LoadingComponent },
      { path: '', redirectTo: 'loading-test', pathMatch: 'full' },
      { path: 'table-example', component: TableExampleComponent },
      { path: '', redirectTo: 'table-example', pathMatch: 'full' }

    ]
  },
  { path: '', redirectTo: 'clinics', pathMatch: 'full' },
  { path: '**', redirectTo: 'clinics' }
];

