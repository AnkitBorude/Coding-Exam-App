import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Question, QuestionService,TestCase } from './create-question.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FloatingAlertComponent } from '../../../shared/floating-alert/floating-alert.component';
@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})
export class CreateQuestionsComponent {
  questionForm: FormGroup;
  examId:number ;
  questionAdded:boolean=false;
  constructor(private fb: FormBuilder, public questionService: QuestionService,private route:ActivatedRoute) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      expectedOutput: ['', Validators.required],
      marks: ['', Validators.required],
      testcasei:['',Validators.required],
      testcaseo:['',Validators.required]
    });
    this.setExamId();
  }
  setExamId()
  {
    this.examId = +this.route.snapshot.params['exam_id'];
    console.log("Current Exam Id"+ this.examId);
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
      const test_case:TestCase={
        test_case_id:Math.floor(10000 + Math.random() * 90000),
        test_case_input:this.questionForm.value.testcasei,
        test_case_output:this.questionForm.value.testcaseo
      };
      const question: Question = {
        question_id: Math.floor(10000 + Math.random() * 90000), // Set a temporary question_id
        coding_question: this.questionForm.value.question,
        q_expected_output: this.questionForm.value.expectedOutput,
        marks: this.questionForm.value.marks,
        test_cases:[test_case]
      };
      console.log(question);
      const exam_id = this.examId;
      this.questionService.addQuestion(exam_id, question).subscribe(addedQuestion => {
        this.questionService.questions.push(question);
        this.questionForm.reset();
        this.questionAdded=true;
        setInterval(()=>{
          this.questionAdded=false;
        },2500);
      });
    }
  }
  deleteQuestion(index: number) {
    const examId = this.examId;
    this.questionService.removeQuestion(examId, index);
  }
  
  ngOnInit() {
    this.setExamId();
    const examId = this.examId; 
    this.questionService.getQuestions(examId).subscribe(questions => {
      console.log(questions);
      this.questionService.questions = questions;
    });
  }
}
