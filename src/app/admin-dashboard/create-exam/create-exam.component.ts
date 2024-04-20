import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamService, Exam } from './create-exam.service';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {
  examForm: FormGroup;

  constructor(private fb: FormBuilder, public examService: ExamService) {
    this.examForm = this.fb.group({
      examName: ['', Validators.required],
      totalTime: ['', Validators.required],
      attendBeforeDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const exam: Exam = {
        examName: this.examForm.value.examName,
        totalTime: this.examForm.value.totalTime,
        attendBeforeDate: this.examForm.value.attendBeforeDate,
        examId: 0
      };
      this.examService.addExam(exam);
      this.examForm.reset();
    }
  }
  deleteExam(examId: number) {
    this.examService.removeExam(examId);
  }
}
