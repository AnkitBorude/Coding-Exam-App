import { Injectable, inject } from "@angular/core";
import { Subject } from "rxjs";
import { TimeInterval } from "rxjs/internal/operators/timeInterval";
import { ExamService } from "../admin-dashboard/create-exam/create-exam.service";
import { CodeService } from "./code.service";

export interface Result {
    result_id: number;
    fk_student_id: number;
    fk_exam_id: number;
    answers?: Answer[];
    result_marks?: number;
    result_time_taken?: number;
  }
  
  export interface Answer {
    fk_question_id: number;
    answer?: string;
    isCorrect?: boolean;
  }

  @Injectable({
    providedIn: 'root'
  })
  export class ResultService{
    public studentResult:Result;

    public attendedQuestions:number[]=[];
    public attendedQuestionIndex:number[]=[];

    public currentCode:string;

    public codeRunnig=new Subject<{isCorrect:boolean,isCodeSubmitted:boolean}>();//settinh true when the code is just meant to run 

    public Minutes:number=0;
    public Seconds:number=0;
    private timeInterval:any;

    public totalQuestions:number;
    public totalQuestionsCorrect:number;
    public totalMarks:number;
    public totalQuestionsAttended:number;
    public totalQuestionsWrong:number;
    examService:CodeService;
    constructor(){
      this.examService=inject(CodeService);
    }
    public initResult(sid:number,eid:number)
    {
        this.studentResult={
        result_id:Math.floor(10000 + Math.random() * 90000),
        fk_exam_id: eid,
        fk_student_id:sid,
        answers:[]
        };
        this.initTimer(60);
        this.totalQuestions=this.examService.exam.exam_total_questions;
        console.log("result initialized successfully");
        console.log("Exam Details are as follows");
        console.log(this.examService.exam.coding_questions);
    }
    public appendAnswer(qid:number,correct:boolean)
    {
        const answer:Answer={
            fk_question_id:qid,
            answer:this.currentCode,//accessing submitted code here
            isCorrect:correct
        }
        const existingAnswerIndex = this.studentResult.answers.findIndex(
            (a) => a.fk_question_id === qid
          );
        let currentIndex=this.examService.currentQuestionIndex;
          if (existingAnswerIndex !== -1) {
            if(this.studentResult.answers[existingAnswerIndex].isCorrect)//existing answer is correct
              {
                if(!correct)//newly submitted Answer is wrong
                {
                  this.totalQuestionsCorrect--;
                  this.totalQuestionsWrong++;
                  this.totalMarks=this.totalMarks-this.examService.exam.coding_questions[currentIndex].marks;
                }
              }
              else//existing answer was wrong
              {
                if(correct)//newly answer is correct
                  {
                      this.totalQuestionsCorrect++;
                      this.totalQuestionsWrong--;
                      this.totalMarks=this.totalMarks+this.examService.exam.coding_questions[currentIndex].marks;
                  }
              }
            this.studentResult.answers[existingAnswerIndex] = answer;
           
            console.log("attended existing question");
          } else {
            if(correct)
              {
                this.totalMarks=this.totalMarks+this.examService.exam.coding_questions[currentIndex].marks;
                this.totalQuestionsCorrect++;
              }
              else
              {
                this.totalQuestionsWrong++;
              }
            this.studentResult.answers.push(answer);
            this.totalQuestionsAttended++;
            console.log("appended new answer");
          }
          this.attendedQuestions.push(qid);
          this.attendedQuestionIndex.push(currentIndex);
         
          
    }
    private initTimer(tMinutes:number)
    {
      this.Minutes = tMinutes-1;
      this.Seconds=59;
      this.timeInterval = setInterval(() => {
        if(this.Minutes===0 && this.Seconds===0)
          {
            console.log("TimeExpired");
            clearInterval(this.timeInterval);
          }
        else if(this.Seconds===0)
        {
          this.Minutes--;
          this.Seconds=59;
        }else{
          this.Seconds--;
        }
      }, 1000); // Interval of 1 second (1000 milliseconds)
    }
    public submitExam()
    {

    }
}