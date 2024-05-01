import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-floating-alert',
  templateUrl: './floating-alert.component.html',
  styleUrl: './floating-alert.component.css'
})
export class FloatingAlertComponent implements OnInit,OnDestroy{

  @Input('type')
  alertType:string="success"

  @Input('message')
  message:String="Generic Message"

  @Input('top')
  top:number

  @Input('right')
  right:number

  isHidden:boolean=false;

ngOnInit(): void {
  
}
constructor()
{

}

  close()
  {
    console.log("Close button clicked");
    this.isHidden=true;
   
  }

  ngOnDestroy(): void {
    this.isHidden=false;
  }
}
