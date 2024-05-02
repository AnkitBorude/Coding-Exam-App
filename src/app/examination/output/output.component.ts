import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';
import { FloatingAlertComponent } from '../../shared/floating-alert/floating-alert.component';
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
constructor(private codeService: CodeService){}
ngOnInit()
{
  this.codeService.textSource.subscribe((data)=>{
    this.Code=data;
    console.log(this.Code);
    if(data.stderr==null)
      {
        this.Output=" ";
        if(this.checkAnswer((data.stdout+" ").trim()))
          {
            this.correctAnswer()
          }
        else{
            this.wrongAnswer();
        }
        this.Output=data.stdout;
      }
      else{
        this.Output=" ";
        this.Output=data.stderr;
      }
  });

  this.codeService.submitcode.subscribe(()=>{
    let currentIndex:number=this.codeService.currentQuestionIndex;
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
