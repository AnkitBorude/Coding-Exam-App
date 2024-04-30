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
    coding_questions: CodingQuestion[];
  }
  
  export interface CodingQuestion {
    question_id?: number;
    q_expected_output?: string;
    coding_question: string;
    test_cases: TestCase[];
    answers: Answer[];
  }
  
  export interface TestCase {
    test_case_id?: number;
    test_case_input: string;
    test_case_output:string;
  }
  
  export interface Answer {
    answer_id?: number;
    answer_code?: string;
    answer_isCorrect?: boolean;
  }