import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface User {
  numeroEmpleado: string;
  nombre?: string;
  apellidos?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'factorycontrol_user';

  private userSubject = new BehaviorSubject<User | null>(
    this.loadUserFromStorage()
  );
  user$ = this.userSubject.asObservable();

  /** Login simulado (luego HTTP) **/ // Simulación: si hay datos, “logueamos”
  login(numeroEmpleado: string, password: string): Observable<User> {
    const user: User ={
      numeroEmpleado,
      nombre: 'Nombre',
      apellidos: 'Apellidos',
    };

    this.userSubject.next(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

    return of(user);
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }


  private loadUserFromStorage(): User | null {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    }catch{
      localStorage.removeItem(this.STORAGE_KEY);
      return null;
    }
  }
}
