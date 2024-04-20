import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exams: Exam[] = [];

  addExam(exam: Exam) {
    const examId = Math.floor(10000 + Math.random() * 90000); // Generate a random 5-digit number
    this.exams.push({ ...exam, examId });
  }
  removeExam(examId: number) {
    this.exams = this.exams.filter(exam => exam.examId !== examId);
  }
}


export interface Exam {
  examName: string;
  totalTime: number;
  attendBeforeDate: Date;
  examId: number;
}