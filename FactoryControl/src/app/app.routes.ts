import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MaquinasComponent } from './features/maquinas/maquinas.component';
import { AveriasComponent } from './features/averias/averias.component';
import { PreventivosComponent } from './features/preventivos/preventivos.component';

export const routes: Routes = [
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'maquinas', component: MaquinasComponent },
      { path: 'averias', component: AveriasComponent },
      { path: 'preventivos', component: PreventivosComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }    ]
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full',
  },
];
