import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MaquinasComponent } from './features/maquinas/maquinas.component';
import { AveriasComponent } from './features/averias/averias.component';
import { PreventivosComponent } from './features/preventivos/preventivos.component';
import { LoginLayoutComponent } from './core/layout/login-layout/login-layout.component'
import { LoginComponent } from './features/auth/login/login.component';
import { authChildGuard, authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Zona publica, NO necesario el login correcto
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },

  // Zona privada, necesario un login correcto
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'maquinas', component: MaquinasComponent },
      { path: 'averias', component: AveriasComponent },
      { path: 'preventivos', component: PreventivosComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }    ]
  },

  // Ruta por defecto para redirigir siempre primero LOGIN
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Ruta para recoger defecto de URL y llevarles a LOGIN
  {
    path: '**',
    redirectTo: 'login',
  },
];
