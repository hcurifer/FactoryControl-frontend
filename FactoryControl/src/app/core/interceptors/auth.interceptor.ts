import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

/**
 * Interceptor JWT
 * Añade automáticamente el header Authorization a todas las peticiones HTTP
 * si existe un token en la sesión.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Inyectamos el AuthService de forma funcional
  const authService = inject(AuthService);

  // Obtenemos el token guardado en localStorage
  const token = authService.getToken();

  // Si no hay token, dejamos pasar la request sin modificar
  if (!token) {
    return next(req);
  }

  // Clonamos la request añadiendo el header Authorization
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Continuamos la cadena de interceptores
  return next(authReq);
};
