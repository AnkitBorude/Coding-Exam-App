import { Component, Input } from '@angular/core';
import { CodeService } from '../code.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-submit-code',
  templateUrl: './submit-code.component.html',
  styleUrl: './submit-code.component.css'
})
export class SubmitCodeComponent {
  submitExamToggle:boolean=false;
  constructor(private codeService: CodeService,private resultService: ResultService) {}
  runCode()
  {
    this.codeService.runcode.next('');
    this.codeService.isCodeSubmitted=false;
  }
  submitCode()
  {
    this.codeService.submitcode.next('');
    this.codeService.isCodeSubmitted=true;
  }
  submitExam()
  {
    this.submitExamToggle=true;
  }
  toggled(data:string)
  {
    if(data==="canceled"){
      this.submitExamToggle=false;
    }
    else{
      this.submitExamToggle=false;
      console.log(this.resultService.studentResult);
    }
  }
}
