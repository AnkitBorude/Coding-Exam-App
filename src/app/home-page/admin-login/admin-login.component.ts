import { Component, OnInit, inject } from '@angular/core';
import { homepageService } from '../home-page.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
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
