import { Component, OnInit, inject } from '@angular/core';
import { homepageService } from '../home-page.service';
import { AdminService } from '../../admin.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  homepages:homepageService;
  admin:AdminService;
  loginForm:FormGroup;
  alertMessage: string | null = null;
  alertType: string | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router)
  {
    this.homepages=inject(homepageService);
    this.admin=inject(AdminService);
    this.loginForm = this.fb.group({
      admin_user_name: ['', Validators.required],
      admin_password: ['', Validators.required]
    });
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(false);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3000/api/admin/login', formData)
        .subscribe(
          (response: any) => {
            this.alertMessage = response.message || 'Login successful, thank you';
            this.alertType = 'success';
            console.log(response.adminId);
            this.admin.setAdminId(+response.adminId);
            this.router.navigate(['/admin-dashboard']);
          },
          (error: any) => {
            this.alertMessage = error.error.error;
            this.alertType = 'danger';
          }
        );
    }
  }
}
