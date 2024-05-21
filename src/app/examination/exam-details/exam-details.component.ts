import { Component, EventEmitter, Output } from '@angular/core';
import { CodeService } from '../code.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-exam-details',
  template: `
    <div class="overlay" [hidden]="showModal">
        <div class="card text-center bg-gradient shadow rounded">
          <div class="card-body">
            <h3 class="card-title mt-2">Exam Details</h3>
            <p>
            <b>Name</b>:-{{examService.exam.exam_name}}<br>
            <b>Id </b>:-{{examService.exam.exam_id}}<br>
            <b>Language</b>:-{{examService.exam.exam_language}}<br>
            <b>Total Time</b>:-{{examService.exam.exam_total_time}}<br>
            <b>Total Questions</b>:-{{examService.exam.exam_total_questions}}<br>
            </p>
            <hr>
            <h3 class="card-title mt-2">Current Details</h3>
            <p>
            <b>Total Marks Obtained</b>:-{{resultService.totalMarks}}<br>
            <b>Total Attended </b>:-{{resultService.totalQuestionsAttended}}<br>
            <b>Total COrrect</b>:-{{resultService.totalQuestionsCorrect}}<br>
            <b>Total Wrong</b>:-{{resultService.totalQuestionsWrong}}<br>

            <b>Total Time Left</b>:-{{resultService.Minutes}}:{{resultService.Seconds}}<br>
            </p>
              <button type="button" class="btn mt-5" (click)="onCancel()" style="background-color: #212529; color:white">Cancel</button>
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
      width: 600px;
      height:550px;
    }
    
    button{
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
export class ExamDetailsComponent {
  constructor(public examService:CodeService,public resultService:ResultService){}
  showModal = false;
  @Output() eventFromChild = new EventEmitter<any>();
  headMessage:string="Do You really want to submit the exam ?";
  footMessage:string="*You cannot attend exam again once you submitted";
  onSubmit() {
    // Handle submit logic here
    console.log('Exam submitted');
    this.eventFromChild.emit("submitted");
    this.showModal = true;
  }

  onCancel() {
    // Handle cancel logic here
    console.log('Exam submission canceled');
    this.eventFromChild.emit("canceled");
    this.showModal = true;
  }
}
