import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentLoginComponent } from './home-page/student-login/student-login.component';
import { AdminLoginComponent } from './home-page/admin-login/admin-login.component';
import { StudentRegisterComponent } from './home-page/student-register/student-register.component';
import { AdminRegisterComponent } from './home-page/admin-register/admin-register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ExaminationComponent } from './examination/examination.component';
import { CreateExamComponent } from './admin-dashboard/create-exam/create-exam.component';
import { CreateQuestionsComponent } from './admin-dashboard/create-exam/create-questions/create-questions.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path:'',component:AppComponent,children:[
  {path:'homepage',component:HomePageComponent,children:[
    { path: '', redirectTo: 'student-login', pathMatch: 'full' },
    {path:'student-login',component:StudentLoginComponent},
    {path:'admin-login',component:AdminLoginComponent},
    {path:'student-register',component:StudentRegisterComponent},
    {path:'admin-register',component:AdminRegisterComponent}
  ]},
  {path:'admin-dashboard',component:AdminDashboardComponent,children:[
    { path: '', redirectTo: 'create-exam', pathMatch: 'full' },
    { path: 'create-exam', component:CreateExamComponent},
    {path:'add-questions/:exam_id',component:CreateQuestionsComponent}
  ]},
  {path:'student-dashboard',component:StudentDashboardComponent},
  {path:'examination/:exam_id/:student_id',component:ExaminationComponent}
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
