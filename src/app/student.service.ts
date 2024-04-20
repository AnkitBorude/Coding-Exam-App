import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentId: string;

  setStudentId(id: string) {
    this.studentId = id;
  }

  getStudentId(): string {
    return this.studentId;
  }
}