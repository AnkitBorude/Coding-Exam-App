import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-attend-exam',
  templateUrl: './attend-exam.component.html',
  styleUrl: './attend-exam.component.css'
})
export class AttendExamComponent {
  examCode: string = '';
  studentId: number = this.student.getStudentId(); // Replace with the actual student ID
  message: string = '';

  constructor(private http: HttpClient,private router:Router,public student:StudentService) { }

  checkAttendance() {
    const examId =  parseInt(this.examCode); // Implement this function to get exam ID from exam code

    // Make the API call to check attendance
    this.http.get(`http://localhost:3000/api/exams/check-attendance/${examId}/${this.studentId}`)
      .subscribe(
        (response: any) => {
          this.message = response.message;
          this.router.navigate(['/examination',examId,this.studentId]);
        },
        (error) => {
          console.error('Error checking attendance:', error);
          this.message = 'An error occurred while checking attendance.';
        }
      );
  }

}
