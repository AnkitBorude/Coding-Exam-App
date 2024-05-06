import { Component, Input } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-submit-code',
  templateUrl: './submit-code.component.html',
  styleUrl: './submit-code.component.css'
})
export class SubmitCodeComponent {
  submitExamToggle:boolean=false;
  constructor(private codeService: CodeService) {}
  runCode()
  {
    this.codeService.runcode.next('');
  }
  submitCode()
  {
    this.codeService.submitcode.next('');
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
      //handle the exam submission here
    }
  }
}
