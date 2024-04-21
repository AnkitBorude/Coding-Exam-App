import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './create-question.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {
  private apiUrl = 'http://localhost:3000/api/exams'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getQuestions(examId: number): Observable<Question[]> {
    const url = `${this.apiUrl}/${examId}/questions`;
    return this.http.get<Question[]>(url);
  }

  addQuestion(examId: number, question: Question): Observable<Question> {
    const url = `${this.apiUrl}/${examId}/questions`;
    return this.http.post<Question>(url, question);
  }

  deleteQuestion(examId: number, questionId: number): Observable<void> {
    const url = `${this.apiUrl}/${examId}/questions/${questionId}`;
    return this.http.delete<void>(url);
  }
}