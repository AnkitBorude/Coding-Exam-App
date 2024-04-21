import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentID: number;

  setStudentId(id: number) {
    this.studentID = id;
    localStorage.setItem('studentID',''+id);
  }

  getStudentId(): number {
    const item=localStorage.getItem('studentID');
    this.studentID= +item;
    return this.studentID;
  }
}