import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Question, QuestionService } from './create-question.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})
export class CreateQuestionsComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder, public questionService: QuestionService) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      expectedOutput: ['', Validators.required],
      marks: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.questionForm.valid) {
  //     const question: Question = {
  //       question: this.questionForm.value.question,
  //       expectedOutput: this.questionForm.value.expectedOutput,
  //       marks: this.questionForm.value.marks
  //     };
  //     this.questionService.addQuestion(question);
  //     this.questionForm.reset();
  //   }
  // }
  onSubmit() {
    if (this.questionForm.valid) {
      const question: Question = {
        question_id: Math.floor(10000 + Math.random() * 90000), // Set a temporary question_id
        coding_question: this.questionForm.value.question,
        q_expected_output: this.questionForm.value.expectedOutput,
        marks: this.questionForm.value.marks
      };
      const exam_id = 1; // Replace with the actual examId
      this.questionService.addQuestion(exam_id, question).subscribe(addedQuestion => {
        this.questionService.questions.push(addedQuestion);
        this.questionForm.reset();
      });
    }
  }
  // deleteQuestion(index: number) {
  //   this.questionService.removeQuestion(index);
  // }

  deleteQuestion(index: number) {
    const examId = 1; // Replace with the actual examId
    this.questionService.removeQuestion(examId, index);
  }
  
  ngOnInit() {
    const examId = 1; // Replace with the actual examId
    this.questionService.getQuestions(examId).subscribe(questions => {
      console.log(questions);
      this.questionService.questions = questions;
    });
  }
}
