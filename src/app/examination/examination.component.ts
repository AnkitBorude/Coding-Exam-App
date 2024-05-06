import { Component } from '@angular/core';
import { Exam } from './exam.model';
import { CodeService } from './code.service';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { ResultService } from './result.service';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrl: './examination.component.css'
})
export class ExaminationComponent {
  exam: Exam | null = null;
  currentQuestionIndex: number = 0;
  constructor(
    public examService: CodeService,
    private route: ActivatedRoute,
    public student:StudentService,
    public result:ResultService
  ) { }

  ngOnInit() {
    this.fetchExamDetails();
  }

  fetchExamDetails() {
    const examId = +this.route.snapshot.params['exam_id']; // Get exam ID from route parameter
    this.examService.getExamDetails(examId).subscribe(
      (exam) => {
        this.exam = exam;
        this.examService.exam=exam;
      },
      (error) => {
        console.error('Error fetching exam details:', error);
      }
    );
    this.result.initResult(this.student.getStudentId(),examId);
  }
  changeQuestionIndex(i:number)
  {
    this.currentQuestionIndex=i;
    this.examService.currentQuestionIndex=i;
  }
  isSolved(index):boolean{
    if(this.result.attendedQuestionIndex.findIndex((a)=>a===index)===-1)
      {
        return false;
      }
      return true;
  }
}
