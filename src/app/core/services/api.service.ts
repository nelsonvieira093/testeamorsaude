// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Método genérico para GET requests
   * @param path Endpoint da API (sem a base URL)
   * @param params Parâmetros de query (opcional)
   */
  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${path}`, {
        headers: this.getHeaders(),
        params
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response?.data || response) // Ajuste conforme sua API
      );
  }

  /**
   * Método genérico para POST requests
   * @param path Endpoint da API
   * @param body Dados a serem enviados
   */
  post<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${path}`, body, {
        headers: this.getHeaders()
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response?.data || response)
      );
  }

  /**
   * Método genérico para PUT requests
   * @param path Endpoint da API
   * @param body Dados a serem atualizados
   */
  put<T>(path: string, body: object = {}): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${path}`, body, {
        headers: this.getHeaders()
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response?.data || response)
      );
  }

  /**
   * Método genérico para DELETE requests
   * @param path Endpoint da API
   */
  delete<T>(path: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${path}`, {
        headers: this.getHeaders()
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response?.data || response)
      );
  }

  /**
   * Cria headers com auth token quando disponível
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  /**
   * Tratamento centralizado de erros
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);

    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do client
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      errorMessage = `Código ${error.status}: ${error.message}`;
      
      // Tratamento específico para erros 401 (Não autorizado)
      if (error.status === 401) {
        // Redirecionar para login ou renovar token
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Método para upload de arquivos
   */
  uploadFile<T>(path: string, file: File, fieldName = 'file'): Observable<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    return this.http
      .post<T>(`${this.baseUrl}${path}`, formData, {
        headers: this.getFileUploadHeaders()
      })
      .pipe(catchError(this.handleError));
  }

  private getFileUploadHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}