import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      { path: '**', redirectTo: '' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, DashboardModule]
})
export class AppRoutingModule { }
