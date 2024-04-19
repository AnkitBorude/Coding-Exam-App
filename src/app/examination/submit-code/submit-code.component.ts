import { Component } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-submit-code',
  templateUrl: './submit-code.component.html',
  styleUrl: './submit-code.component.css'
})
export class SubmitCodeComponent {

  constructor(private codeService: CodeService) {}
  runCode()
  {
    this.codeService.runcode.next('');
  }
}
