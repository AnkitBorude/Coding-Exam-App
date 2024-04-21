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
        this.Output=data.stdout;
      }
      else{
        this.Output=data.stderr;
      }
  })
}
preventPaste(event: ClipboardEvent) {
  event.preventDefault();
}
}
