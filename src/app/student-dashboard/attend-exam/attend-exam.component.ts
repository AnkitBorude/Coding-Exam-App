import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attend-exam',
  templateUrl: './attend-exam.component.html',
  styleUrl: './attend-exam.component.css'
})
export class AttendExamComponent {
  examCode: string = '';
  studentId: number = 1; // Replace with the actual student ID
  message: string = '';

  constructor(private http: HttpClient) { }

  checkAttendance() {
    const examId =  parseInt(this.examCode); // Implement this function to get exam ID from exam code

    // Make the API call to check attendance
    this.http.get(`http://localhost:3000/api/exams/check-attendance/${examId}/${this.studentId}`)
      .subscribe(
        (response: any) => {
          this.message = response.message;
        },
        (error) => {
          console.error('Error checking attendance:', error);
          this.message = 'An error occurred while checking attendance.';
        }
      );
  }

}
