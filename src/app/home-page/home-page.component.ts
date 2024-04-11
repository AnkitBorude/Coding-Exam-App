import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { homepageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  homepages:homepageService;
  isRegistration:boolean;
  changeDetectorcycle:ChangeDetectorRef;
  constructor()
  {
    this.homepages=inject(homepageService);
    this.changeDetectorcycle=inject(ChangeDetectorRef);
  }
  ngOnInit()
  {
    this.homepages.registrationActivated.subscribe(
      response => {
        this.isRegistration=response;
        this.changeDetectorcycle.detectChanges();
      }
    );
  }
}
