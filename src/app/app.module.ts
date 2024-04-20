import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StudentLoginComponent } from './home-page/student-login/student-login.component';
import { AdminLoginComponent } from './home-page/admin-login/admin-login.component';
import { AdminRegisterComponent } from './home-page/admin-register/admin-register.component';
import { StudentRegisterComponent } from './home-page/student-register/student-register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ExaminationComponent } from './examination/examination.component';
import { CodingPlaygroundComponent } from './examination/coding-playground/coding-playground.component';
import { SubmitCodeComponent } from './examination/submit-code/submit-code.component';
import { QuestionComponent } from './examination/question/question.component';
import { OutputComponent } from './examination/output/output.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentLoginComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    ExaminationComponent,
    CodingPlaygroundComponent,
    SubmitCodeComponent,
    QuestionComponent,
    OutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
