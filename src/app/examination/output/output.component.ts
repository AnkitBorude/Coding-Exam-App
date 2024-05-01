import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
Code:any=''
Output:string;
constructor(private codeService: CodeService){}
ngOnInit()
{
  this.codeService.textSource.subscribe((data)=>{
    this.Code=data;
    console.log(this.Code);
    if(data.stderr==null)
      {
        this.Output=" ";
        if(this.checkAnswer(data.stdout))
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
  })
}
checkAnswer(output:string):boolean
{
  let currentIndex:number=this.codeService.currentQuestionIndex;
  let test_case_ouput:string=this.codeService.exam.coding_questions[currentIndex].test_cases[0].test_case_output;
  if(output===test_case_ouput)
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

}
wrongAnswer()
{

}
preventPaste(event: ClipboardEvent) {
  event.preventDefault();
}
}
