import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

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
    public currentCode:string;
    public codeRunnig=new Subject<boolean>();
    public initResult(sid:number,eid:number)
    {
        this.studentResult={
        result_id:Math.floor(10000 + Math.random() * 90000),
        fk_exam_id: eid,
        fk_student_id:sid,
        answers:[]
        };
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
    }

  }