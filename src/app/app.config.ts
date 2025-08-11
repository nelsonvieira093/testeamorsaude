// src/app/app.config.ts
// Este arquivo é usado apenas se você estiver utilizando Angular standalone (sem AppModule/AppRoutingModule).
// Se seu projeto usa AppModule/AppRoutingModule, este arquivo pode ser removido.

// Exemplo standalone: (NÃO use em conjunto com AppModule/AppRoutingModule)

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptorProvider } from './core/auth/auth.interceptor';
import { routes } from './app.routes'; // Certifique-se de que existe src/app/routes.ts exportando o array de rotas.
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    [authInterceptorProvider]
  ]
};

