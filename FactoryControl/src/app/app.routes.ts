import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'app',
    component: MainLayoutComponent,
    children: []
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
];
