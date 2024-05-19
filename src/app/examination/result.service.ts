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
        console.log("result initialized successfully");
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
    
          if (existingAnswerIndex !== -1) {
            this.studentResult.answers[existingAnswerIndex] = answer;
            console.log("attended existing question");
          } else {
            this.studentResult.answers.push(answer);
            console.log("appended new answer");
          }
          this.attendedQuestions.push(qid);
          this.attendedQuestionIndex.push(this.examService.currentQuestionIndex);
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
        console.log("Minutes:- ", this.Minutes);
        console.log("Seconds:-",this.Seconds);
      }, 1000); // Interval of 1 second (1000 milliseconds)
    }
}