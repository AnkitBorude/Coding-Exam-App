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
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentLoginComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    StudentRegisterComponent,
    AdminDashboardComponent,
    StudentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
