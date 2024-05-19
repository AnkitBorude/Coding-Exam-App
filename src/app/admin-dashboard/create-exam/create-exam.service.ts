import { Injectable } from '@angular/core';
import { ExamApiService } from './create-exam-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  exams: Exam[] = [];

  constructor(private examApiService: ExamApiService) { }

  getExams(adminId: number): Observable<Exam[]> {
    return this.examApiService.getExams(adminId);
  }

  addExam(exam: Exam): Observable<Exam> {
    return this.examApiService.addExam(exam);
  }

  removeExam(examId: number) {
    this.examApiService.deleteExam(examId).subscribe(() => {
      this.exams = this.exams.filter(exam => exam.exam_id !== examId);
    });
  }
}

export interface Exam {
  exam_id: number;
  exam_total_questions?: number;
  exam_total_time: string;
  exam_name: string;
  exam_language?: string;
  exam_total_correct?: number;
  exam_total_attended?: number;
  exam_due_date: Date;
  fk_admin_id: number;
  fk_student_ids?: number[];
  coding_questions?: CodingQuestion[];
}

interface CodingQuestion {
  question_id: number;
  q_expected_output?: string;
  coding_question: string;
  test_cases: TestCase[];
  answers: Answer[];
}

export interface TestCase {
  test_case_id?: number;
  test_case_input?: string;
  test_case_output?:string;
}

interface Answer {
  answer_id: number;
  answer_code?: string;
  answer_isCorrect?: boolean;
}