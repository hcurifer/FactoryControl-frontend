import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  numeroEmpleado: string;
  nombre?: string;
  apellidos?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  /** Login simulado (luego HTTP) **/
  login(numeroEmpleado: string, password: string): boolean {
    if (!numeroEmpleado || !password) return false;

    // Simulación: si hay datos, “logueamos”
    this.userSubject.next({
      numeroEmpleado,
      nombre: 'Nombre',
      apellidos: 'Apellidos'
    });

    return true;
  }

  logout(): void {
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
