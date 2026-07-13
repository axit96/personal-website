import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
    title: 'Profile',
  },
  {
    path: 'stockanalysis',
    loadComponent: () =>
      import('./stock-analysis/stock-analysis.page').then((m) => m.StockAnalysisPage),
    title: 'Stock Analysis',
  },
  { path: '**', redirectTo: 'profile' },
];
