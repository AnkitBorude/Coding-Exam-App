import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentLoginComponent } from './home-page/student-login/student-login.component';
import { AdminLoginComponent } from './home-page/admin-login/admin-login.component';
import { StudentRegisterComponent } from './home-page/student-register/student-register.component';
import { AdminRegisterComponent } from './home-page/admin-register/admin-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path:'',component:AppComponent,children:[
  {path:'homepage',component:HomePageComponent,children:[
    { path: '', redirectTo: 'student-login', pathMatch: 'full' },
    {path:'student-login',component:StudentLoginComponent},
    {path:'admin-login',component:AdminLoginComponent},
    {path:'student-register',component:StudentRegisterComponent},
    {path:'admin-register',component:AdminRegisterComponent}
  ]}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
