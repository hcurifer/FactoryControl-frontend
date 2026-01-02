import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';

import { AuthService, User } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  user$!: Observable<User | null>;

  constructor(
    private auth: AuthService,
    private router: Router
  ){
      this.user$ = this.auth.user$;
  }

  get isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  onActionClick(): void {
    if (this.isLoginPage) {
      return;
    }

    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
