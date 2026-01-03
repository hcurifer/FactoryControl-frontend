import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../../data-access/models/auth.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  user$: Observable<LoginUser | null>;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.user$ = this.auth.user$;
  }

  get isLoginPage(): boolean {
    return this.router.url.startsWith('/login');
  }

  onActionClick(): void {
    if (this.isLoginPage) {
      return;
    }

    this.auth.clearSession();
    this.router.navigate(['/login']);
  }
}
