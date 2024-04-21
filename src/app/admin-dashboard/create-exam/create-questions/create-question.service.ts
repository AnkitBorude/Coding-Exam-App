import { Injectable } from '@angular/core';
import { QuestionApiService } from './create-question-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questions: Question[] = [];

  constructor(private questionApiService: QuestionApiService) { }

  getQuestions(examId: number): Observable<Question[]> {
    return this.questionApiService.getQuestions(examId);
  }

  addQuestion(examId: number, question: Question): Observable<Question> {
    return this.questionApiService.addQuestion(examId, question);
  }

  removeQuestion(examId: number, index: number) {
    const question = this.questions[index];
    this.questionApiService.deleteQuestion(examId, question.question_id).subscribe();
    this.questions.splice(index, 1);
  }

  getTotalQuestions():number{
    return this.questions.length;
  }
}

export interface Question {
  question_id: number;
  q_expected_output: string;
  coding_question: string;
  test_cases?: TestCase[];
  answers?: Answer[];
  marks:number;
}

interface TestCase {
  test_case_id: number;
  test_case: string;
}

interface Answer {
  answer_id: number;
  answer_code: string;
  answer_isCorrect: boolean;
}