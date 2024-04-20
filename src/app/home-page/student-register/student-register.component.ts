import { Component, OnInit, Output, inject } from '@angular/core';
import { homepageService} from '../home-page.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent implements OnInit{
  homepages:homepageService;
  registrationForm: FormGroup;
  alertMessage: string | null = null;
  alertType: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient)
  {
    this.homepages=inject(homepageService);
    this.registrationForm = this.fb.group({
      student_user_name: ['', Validators.required],
      student_name: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      student_password: ['', [Validators.required, Validators.minLength(6)]],
      student_confirm_password: ['', Validators.required],
      student_id: this.generateStudentId()
    }, {
      validator: this.confirmPasswordValidator
    });
  }
  generateStudentId(): number {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  confirmPasswordValidator(form: FormGroup) {
    const password = form.get('student_password')?.value;
    const confirmPassword = form.get('student_confirm_password')?.value;

    if (password !== confirmPassword) {
      form.get('student_confirm_password')?.setErrors({ mismatch: true });
    } else {
      form.get('student_confirm_password')?.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      delete formData.student_confirm_password; // Remove confirm password field

      this.http.post('http://localhost:3000/api/student/register', formData)
        .subscribe(
          (response: any) => {
            this.alertMessage = response.message || 'Registration successful, thank you';
            this.alertType = 'success';
            this.registrationForm.reset();
          },
          (error: any) => {
            this.alertMessage = error.error.error;
            this.alertType = 'danger';
          }
        );
    }
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(true);
  }
}
