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
    private result:ResultService
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
        this.initializeTimer(exam.exam_total_time);
        this.populateNavLinks(exam.coding_questions);
      },
      (error) => {
        console.error('Error fetching exam details:', error);
      }
    );
    this.result.initResult(this.student.getStudentId(),examId);
  }

  initializeTimer(examTotalTime: string) {
    // Implement the logic to initialize the timer with the examTotalTime
    console.log('Initializing timer:', examTotalTime);
  }

  populateNavLinks(questions: any[]) {
    // Implement the logic to populate the navigation links with the questions
    console.log('Populating nav links with questions:', questions);
  }
  changeQuestionIndex(i:number)
  {
    this.currentQuestionIndex=i;
    this.examService.currentQuestionIndex=i;
  }
}
