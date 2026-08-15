import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home-module').then(m => m.HomeModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule)
  },
  {
    path: 'trajectory',
    loadChildren: () => import('./features/trajectory/trajectory-module').then(m => m.TrajectoryModule)
  },
  {
    path: 'astronauts',
    loadChildren: () => import('./features/astronauts/astronauts-module').then(m => m.AstronautsModule)
  },
  {
    path: 'launch-history',
    loadChildren: () => import('./features/launch-history/launch-history-module').then(m => m.LaunchHistoryModule)
  },
  {
    path: 'chat-control',
    loadChildren: () => import('./features/chat-control/chat-control-module').then(m => m.ChatControlModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
