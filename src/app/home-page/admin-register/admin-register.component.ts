import { Component, inject } from '@angular/core';
import { homepageService } from '../home-page.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {
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
