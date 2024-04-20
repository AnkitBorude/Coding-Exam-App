import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CodeService {
    public runcode=new Subject();
    public textSource = new BehaviorSubject<any>('');

    constructor() {}
  
    changeText(text: string) {
      this.textSource.next(text);
    }
  }