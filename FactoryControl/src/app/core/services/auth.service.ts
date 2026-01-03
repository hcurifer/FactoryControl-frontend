import { Injectable } from '@angular/core';
import { LoginResponse, LoginUser } from '../../data-access/models/auth.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'fc_token';
  private readonly USER_KEY = 'fc_user';
  private userSubject = new BehaviorSubject<LoginUser | null>(this.loadUser());
  user$ = this.userSubject.asObservable();


  /** Guardar el token y el usuario tras el login correcto */
  setSession(data: LoginResponse): void{
    localStorage.setItem(this.TOKEN_KEY, data.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
    this.userSubject.next(data.user);
  }

  /** Elimina session despues de logout */
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  /** Devolver el token JWT */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /** Devolver el usuario autenticado */
  getUser(): LoginUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  /** verificacr si existe una session */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadUser(): LoginUser | null {
  const raw = localStorage.getItem(this.USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

}
