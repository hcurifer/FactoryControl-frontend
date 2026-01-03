import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthApi } from '../../../data-access/api/auth.api';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authApi: AuthApi,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
    numeroEmpleado: ['', [Validators.required]],
    password: ['',[Validators.required]]
  });
  }

  /** submit (): void {
    if (this.loginForm.invalid) return;

    const { numeroEmpleado, password } = this.loginForm.value;

    const ok = this.auth.login(numeroEmpleado, password);

    if (ok) {
      this.router.navigate(['/app']);
    }
  } **/ // Se comenta por ser la funcion de simulacion de auth.service


  submit(): void {
  if (this.loginForm.invalid) return;

  const { numeroEmpleado, password } = this.loginForm.value;

  this.authApi.login({
    numero_empresa: numeroEmpleado,
    password: password
  }).subscribe({
    next: (res) => {
      this.auth.setSession(res);
      this.router.navigate(['/app']);
    },
    error: (err) => {
      console.error('LOGIN REAL ERROR:', err);
    }
  });
}

}
