import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './pages/singup/singup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';

const routes: Routes = [

  {path: '',                component:  HomeComponent,         pathMatch: 'full'},
  {path: 'signup',          component:  SingupComponent,       pathMatch: 'full',},
  {path: 'login',           component:  LoginComponent,        pathMatch: 'full'},
  {path: 'admin',           component:  DashboardComponent, //canActivate: [NormalGuard],   
   //here we ara performing childing loading inside Admin
  children:[
            {path: '', component: WelcomeComponent},
             {path: 'profile', component: ProfileComponent}, 
             
            ]},
 

  {path: 'user-dashboard',  component:  UserDashboardComponent,pathMatch: 'full', canActivate: [NormalGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
