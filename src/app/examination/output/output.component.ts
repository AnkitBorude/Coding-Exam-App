import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { FloatingAlertComponent } from '../../shared/floating-alert/floating-alert.component';
import { ResultService } from '../result.service';
@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
Code:any=''
Output:string;
isCorrect:boolean=false;
isWrong:boolean=false;
isError:boolean=false;
isExecutedSuccessFully:boolean=false;
isAnswerSubmitted:boolean=false;
constructor(private codeService: CodeService,private resultService:ResultService){}
ngOnInit()
{
  this.codeService.textSource.subscribe((data)=>{
    this.Code=data;
    console.log(this.Code);
    let correct:boolean=false;
    if(data.stderr==null)
      
      {
        this.isExecutedSuccessFully=true;
      setTimeout(()=>{
        this.isExecutedSuccessFully=false;
      },2500);
        this.Output=" ";
        if(this.checkAnswer((data.stdout+" ").trim()))
          {
            correct=true;
            this.correctAnswer()
          }
        else{
          correct=false;
            this.wrongAnswer();
        }
        this.Output=data.stdout;
      }
      else{
        this.Output=" ";
        this.Output=data.stderr;
        this.isError=true;
        setTimeout(()=>{
          this.isError=false;
        },2500);
      }
    this.resultService.codeRunnig.next({isCorrect:correct,isCodeSubmitted:this.codeService.isCodeSubmitted});
  });

  this.codeService.submitcode.subscribe(()=>{
    let currentIndex:number=this.codeService.currentQuestionIndex;
    const qid:number=this.codeService.exam.coding_questions[currentIndex].question_id;
    this.codeService.runcode.next('');//running the code where the code would be saved too
    this.resultService.codeRunnig.subscribe((value)=>{
      this.resultService.appendAnswer(qid,value.isCorrect);//appending the question back.
    console.log("Answer Submitted SuccessFully");
    console.log(this.resultService.studentResult);
    })
  })
}
checkAnswer(output:string):boolean
{
  let currentIndex:number=this.codeService.currentQuestionIndex;
  let test_case_output:string=this.codeService.exam.coding_questions[currentIndex].test_cases[0].test_case_output.trim();
  if(output===test_case_output)
    {
      console.log("Test Case Passed");
      return true;
    }
    else{
      console.log("Test case failed ");
      return false;
    }
}
correctAnswer()
{
    console.log("Answer is Correct");
    this.isCorrect=true;
    setTimeout(()=>{
      this.isCorrect=false;
    },3000);
}
wrongAnswer()
{
    console.log("Wrong Answer");
    this.isWrong=true;
    setTimeout(()=>{
      this.isWrong=false;
    },3000);
}

preventPaste(event: ClipboardEvent) {
  event.preventDefault();
}
}
