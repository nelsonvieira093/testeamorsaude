// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:8000/api/auth'; // Ajuste para sua API Laravel

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.authStatus.next(true);
        this.router.navigate(['/clinics']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.authStatus.next(!!token);
  }
}