/*import { Routes } from '@angular/router'; // Importa o tipo Routes do Angular para definir as rotas da aplicação
import { LoginComponent } from './login/login.component'; // Importa o componente de login
// O arquivo 'auth.routes.ts' define as rotas relacionadas à autenticação, como a tela de login
export const authRoutes: Routes = [
  {
    path: 'login', // Define o caminho da rota para a página de login
    component: LoginComponent, // O componente LoginComponent será carregado quando o caminho 'login' for acessado
  },
  
  // Você pode adicionar outras rotas relacionadas à autenticação aqui, como 'logout' ou 'registro'
];*/

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClinicsListComponent } from '../clinics/list/clinics-list.component';
import { ClinicFormComponent } from '../clinics/form/clinic-form.component';
import { ClinicViewComponent } from '../clinics/view/clinic-view.component';
import { AuthGuard } from '../../core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'clinics',
    canActivate: [AuthGuard], // Protege todas as rotas de clínicas
    children: [
      { path: '', component: ClinicsListComponent },
      { path: 'new', component: ClinicFormComponent },
      { path: ':id', component: ClinicViewComponent },
      { path: ':id/edit', component: ClinicFormComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // Rota curinga para 404
];