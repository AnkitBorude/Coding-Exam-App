import { Component, inject } from '@angular/core';
import { homepageService } from '../home-page.service';
import { StudentService } from '../../student.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  homepages:homepageService;
  student:StudentService;
  loginForm: FormGroup;
  alertMessage: string | null = null;
  alertType: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient)
  {
    this.homepages=inject(homepageService);
    this.student=inject(StudentService);
    this.loginForm = this.fb.group({
      student_user_name: ['', Validators.required],
      student_password: ['', Validators.required]
    });
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(false);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3000/api/student/login', formData)
        .subscribe(
          (response: any) => {
            this.alertMessage = response.message || 'Registration successful, thank you';
            this.alertType = 'success';
            console.log(response.studentId);
            this.student.setStudentId(response.studentId)
          },
          (error: any) => {
            this.alertMessage = error.error.error;
            this.alertType = 'danger';
          }
        );
    }
  }
}
