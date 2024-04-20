import { Component, OnInit } from '@angular/core';
import { CodeService } from '../code.service';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
Code:any=''
constructor(private codeService: CodeService){}
ngOnInit()
{
  this.codeService.textSource.subscribe((data)=>{
    this.Code=data;
  })
}
}
