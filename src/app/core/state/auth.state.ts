/*import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Importa BehaviorSubject para gerenciar o estado reativo

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private currentUserSubject: BehaviorSubject<any>; // Define o BehaviorSubject para armazenar os dados do usuário atual
  public currentUser: any;

  constructor() {
    // Inicializa o BehaviorSubject com os dados do usuário armazenados no localStorage, se existirem
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable(); // Torna o BehaviorSubject acessível como um Observable
  }

  // Método para obter o usuário atual
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Método para definir o usuário atual (salvando os dados no localStorage)
  public setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user)); // Armazena os dados do usuário no localStorage
    this.currentUserSubject.next(user); // Atualiza o BehaviorSubject com os novos dados
  }

  // Método para limpar o usuário atual (remover os dados do localStorage)
  public logout(): void {
    localStorage.removeItem('currentUser'); // Remove o usuário do localStorage
    this.currentUserSubject.next(null); // Atualiza o BehaviorSubject para null
  }
}
*/

import { Routes } from '@angular/router';
import { LoginComponent } from '../../features/auth/login/login.component';
import { ClinicsListComponent } from '../../features/clinics/list/clinics-list.component';
import { AuthGuard } from '../../core/auth/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [() => !localStorage.getItem('token')] // Bloqueia se já logado
  },
  { 
    path: 'clinics', 
    component: ClinicsListComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];