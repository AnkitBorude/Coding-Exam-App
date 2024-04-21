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
  adminId:number=1;//access admin id here after login 
  constructor(private fb: FormBuilder, public examService: ExamService) {
    this.examForm = this.fb.group({
      examName: ['', Validators.required],
      totalTime: ['', Validators.required],
      attendBeforeDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.examService.getExams(this.adminId).subscribe(exams => {
      this.examService.exams = exams;
      console.log(exams);
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      const exam: Exam = {
        exam_id: Math.floor(10000 + Math.random() * 90000),
        exam_total_questions: 0,
        exam_total_time: this.examForm.value.totalTime.toString(),
        exam_name: this.examForm.value.examName,
        exam_due_date: this.examForm.value.attendBeforeDate,
        fk_admin_id: this.adminId,
      };
      this.examService.addExam(exam).subscribe(addedExam => {
        console.log("Added Exam");
        console.log(addedExam);
        this.examService.exams.push(addedExam);
        this.examForm.reset();
      });
      console.log(exam);
    }
   
  }

  deleteExam(examId: number) {
    this.examService.removeExam(examId);
  }
}

