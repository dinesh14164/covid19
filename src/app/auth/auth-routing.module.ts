import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { GoBackService as GoBack } from './go-back.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GoBack] 
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [GoBack] 
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
