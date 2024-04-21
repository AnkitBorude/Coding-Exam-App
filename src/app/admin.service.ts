import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminId: number;

  setAdminId(id: number) {
    this.adminId = id;
  }

  getAdminId(): number {
    return this.adminId;
  }
}