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

  onSubmit() {
    if (this.questionForm.valid) {
      const question: Question = {
        question: this.questionForm.value.question,
        expectedOutput: this.questionForm.value.expectedOutput,
        marks: this.questionForm.value.marks
      };
      this.questionService.addQuestion(question);
      this.questionForm.reset();
    }
  }

  deleteQuestion(index: number) {
    this.questionService.removeQuestion(index);
  }
}
