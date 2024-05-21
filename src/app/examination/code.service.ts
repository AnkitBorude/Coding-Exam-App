import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Exam } from './exam.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class CodeService {
    public runcode=new Subject();
    public submitcode=new Subject();//codesubmitted
    public textSource = new Subject<any>();//output
    public isCodeSubmitted:boolean=false;
    public exam: Exam;
    public currentQuestionIndex: number = 0; //holding the current index of the selected question.
    constructor(private http: HttpClient) {}
  
    changeText(text: string) {
      this.textSource.next(text);
    }

    private apiUrl = 'http://localhost:3000/api/exams/';

  getExamDetails(examId: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.apiUrl}/${examId}`).pipe(tap(rexam=>this.exam=rexam));
  }
  public setExam(exam:Exam)
  {
    this.exam=exam;
  }
  }