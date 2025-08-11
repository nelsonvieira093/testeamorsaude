import { Routes } from '@angular/router';
import { ClinicsListComponent } from './list/clinics-list.component';
import { ClinicFormComponent } from './form/clinic-form.component';
import { ClinicViewComponent } from './view/clinic-view.component';

export const CLINICS_ROUTES: Routes = [
  { 
    path: '', 
    component: ClinicsListComponent,
    title: 'Lista de clínicas',
    pathMatch: 'full' 
  },
  { 
    path: 'new', 
    component: ClinicFormComponent,
    title: 'Nova clínica' 
  },
  { 
    path: ':id', 
    component: ClinicViewComponent,
    title: 'Detalhes da clínica' 
  },
  { 
    path: ':id/edit', 
    component: ClinicFormComponent,
    title: 'Editar clínica' 
  }
];