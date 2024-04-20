import { Component, inject } from '@angular/core';
import { homepageService } from '../home-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
  homepages:homepageService;
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient)
  {
    this.homepages=inject(homepageService);
    this.registrationForm = this.fb.group({
      admin_name: ['', Validators.required],
      admin_user_name: ['', Validators.required],
      admin_email: ['', [Validators.required, Validators.email]],
      admin_password: ['', [Validators.required, Validators.minLength(6)]],
      admin_id: Math.floor(10000 + Math.random() * 90000)
    });
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(true);
  }
  onSubmit()
  {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.http.post('http://localhost:3000/api/admin/register', formData)
        .subscribe(
          (response) => {
            alert('Registration successful, thank you.');
            // Additional logic or navigation after successful registration
            this.registrationForm.reset();
          },
          (error) => {
            console.error('Registration error:', error);
            // Handle registration error
          }
        );
    }
  }
}
