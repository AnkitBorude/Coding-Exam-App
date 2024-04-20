import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminId: string;

  setAdminId(id: string) {
    this.adminId = id;
  }

  getAdminId(): string {
    return this.adminId;
  }
}