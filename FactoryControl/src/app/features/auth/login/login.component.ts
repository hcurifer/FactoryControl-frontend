import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
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


  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
    numeroEmpleado: ['', [Validators.required]],
    password: ['',[Validators.required]]
  });
  }

  submit (): void {
    if (this.loginForm.invalid) return;
    console.log('LOGIN SUBMIT', this.loginForm.value);
  }

}
