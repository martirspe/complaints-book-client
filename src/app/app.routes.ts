import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./pages/complaints-book/complaints-book.component').then(m => m.ComplaintsBookComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
