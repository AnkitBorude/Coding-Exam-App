import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exam } from './create-exam.service';

@Injectable({
  providedIn: 'root'
})
export class ExamApiService {
  private apiUrl = 'http://localhost:3000/api/exams'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getExams(adminId: number): Observable<Exam[]> {
    const url = `${this.apiUrl}/admin/${adminId}`;
    return this.http.get<Exam[]>(url);
  }

  addExam(exam: Exam): Observable<Exam> {
    console.log("Att adExam Method");
    console.log(exam);
    return this.http.post<Exam>(`${this.apiUrl}/`, exam);
  }

  deleteExam(examId: number): Observable<void> {
    const url = `${this.apiUrl}/${examId}`;
    return this.http.delete<void>(url);
  }
}