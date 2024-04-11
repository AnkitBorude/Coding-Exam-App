import { Component, inject } from '@angular/core';
import { homepageService } from '../home-page.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export class StudentLoginComponent {
  homepages:homepageService;
  constructor()
  {
    this.homepages=inject(homepageService);
  }
  ngOnInit(): void
  {
    this.homepages.registrationActivated.next(false);
  }
}
