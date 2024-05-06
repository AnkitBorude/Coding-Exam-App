import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { Exam } from '../../examination/exam.model';

@Component({
  selector: 'app-attend-exam',
  templateUrl: './attend-exam.component.html',
  styleUrl: './attend-exam.component.css'
})
export class AttendExamComponent implements OnInit {
  examCode: number;
  studentId: number = this.student.getStudentId(); // Replace with the actual student ID
  message: string = '';
  exams:Exam[]=[];
  constructor(private http: HttpClient,private router:Router,public student:StudentService) { }

  checkAttendance() {
    const examId =  this.examCode; 

    // Make the API call to check attendance
    this.http.get(`http://localhost:3000/api/exams/check-attendance/${examId}/${this.studentId}`)
      .subscribe(
        (response: any) => {
          this.message = response.message;
          if(response.result=="failed")
            {
              this.router.navigate(['/examination',examId,this.studentId]);
            }
        },
        (error) => {
          console.error('Error checking attendance:', error);
          this.message = 'An error occurred while checking attendance.';
        }
      );
  }
  ngOnInit(): void {
    this.http.get<Exam[]>(`http://localhost:3000/api/exams/`).subscribe(
      (response)=>{
        this.exams=response;
        console.log(this.exams);
      },
      (error) => {
        console.error('Error', error);
        this.message = 'An error occurred';
      }
    );
  }

}
