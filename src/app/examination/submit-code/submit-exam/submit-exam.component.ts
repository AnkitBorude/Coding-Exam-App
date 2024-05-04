import { Component } from '@angular/core';

@Component({
  selector: 'app-submit-exam',
  template: `
    <div class="overlay" [hidden]="showModal">
        <div class="card text-center bg-gradient shadow rounded">
          <div class="card-body">
            <h3 class="card-title mt-2">{{headMessage}}</h3>
              <button type="button" class="btn mt-5 mx-2" (click)="onSubmit()" style="background-color: #fd7e14;">Submit</button>
              <button type="button" class="btn mt-5" (click)="onCancel()" style="background-color: #212529; color:white">Cancel</button>
              <h6 class="text-danger mt-5 ">{{footMessage}}</h6>
            </div> 
        </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .card {
      position: absolute;
      width: 400px;
      height:350px;
    }
    
    button{
      height:20%;
      width:40%;
      opacity:0.8;
    }
    button:hover{
      opacity:1;
    }
    img{
      height:30%;
      width:30%;
      background-size: cover;
      background-color:transparent;

    }
  `]
})
export class SubmitExamComponent{
  showModal = false;
  headMessage:string="Do You really want to submit the exam ?";
  footMessage:string="*You cannot attend exam again once you submitted";
  onSubmit() {
    // Handle submit logic here
    console.log('Exam submitted');
    this.showModal = true;
  }

  onCancel() {
    // Handle cancel logic here
    console.log('Exam submission canceled');
    this.showModal = true;
  }
}