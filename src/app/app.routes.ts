import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'card', pathMatch: 'full' },
  {
    path: 'card',
    loadComponent: () => import('./pages/card/card-page').then((m) => m.CardPage),
  },
  {
    path: 'button',
    loadComponent: () => import('./pages/button/button-page').then((m) => m.ButtonPage),
  },
  {
    path: 'dropdown',
    loadComponent: () => import('./pages/dropdown/dropdown-page').then((m) => m.DropdownPage),
  },
  {
    path: 'accordion',
    loadComponent: () => import('./pages/accordion/accordion-page').then((m) => m.AccordionPage),
  },
  {
    path: 'icons',
    loadComponent: () => import('./pages/icons/icons-page').then((m) => m.IconsPage),
  },
  {
    path: 'nav',
    loadComponent: () => import('./pages/nav/nav-page').then((m) => m.NavPage),
  },
  {
    path: 'spinner',
    loadComponent: () => import('./pages/spinner/spinner-page').then((m) => m.SpinnerPage),
  },
  {
    path: 'toggle',
    loadComponent: () => import('./pages/toggle/toggle-page').then((m) => m.TogglePage),
  },
];
