import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-loading',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './login-loading.component.html',
  styleUrl: './login-loading.component.scss'
})
export class LoginLoadingComponent {
  private timerId: number | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Da tiempo a ver la animación y luego entramos al layout privado (/app -> dashboard)
    this.timerId = window.setTimeout(() => {
      this.router.navigateByUrl('/app', { replaceUrl: true });
    }, 3500);
  }

  ngOnDestroy(): void {
    if (this.timerId !== undefined) {
      window.clearTimeout(this.timerId);
    }
  }
}
