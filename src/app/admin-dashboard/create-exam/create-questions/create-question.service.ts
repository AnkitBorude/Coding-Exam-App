import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: Question[] = [];

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  getTotalQuestions(): number {
    return this.questions.length;
  }

  getTotalMarks(): number {
    return this.questions.reduce((total, question) => total + question.marks, 0);
  }
}

export interface Question {
  question: string;
  expectedOutput: string;
  marks: number;
}