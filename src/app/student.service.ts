import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  studentId: string;

  setAdminId(id: string) {
    this.studentId = id;
  }

  getAdminId(): string {
    return this.studentId;
  }
}