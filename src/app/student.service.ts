import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentID: number;

  setStudentId(id: number) {
    this.studentID = id;
  }

  getStudentId(): number {
    return this.studentID;
  }
}