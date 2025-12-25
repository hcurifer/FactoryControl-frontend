import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
];
