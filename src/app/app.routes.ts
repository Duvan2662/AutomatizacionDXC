import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'DXC',
    loadComponent: () => import('./dashboard/dashboard.component').then(component => component.DashboardComponent),
    children:[
      {
        path:'form',
        title: 'Form',
        loadComponent:() => import('./pages/formulario/formulario.component').then(component=>component.FormularioComponent),

      },
      {
        path:'download',
        title: 'Download',
        loadComponent:() => import('./pages/formulario/formulario.component').then(component=>component.FormularioComponent),
      },
      {
        path:'',
        redirectTo:'form',
        pathMatch:'full'
      }

    ]
  },
  {
    path:'',
    redirectTo: '/DXC',
    pathMatch:'full'
  }
];
