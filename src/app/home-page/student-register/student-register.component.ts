import { Component, OnInit, Output, inject } from '@angular/core';
import { homepageService} from '../home-page.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrl: './student-register.component.css'
})
export class StudentRegisterComponent implements OnInit{
  homepages:homepageService;
  constructor()
  {
    this.homepages=inject(homepageService);
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(true);
  }
}
