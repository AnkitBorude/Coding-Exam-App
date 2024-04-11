import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})
export class homepageService{
    registrationActivated:Subject<boolean>;
    constructor() {
        this.registrationActivated = new Subject<boolean>();
      }    
}
