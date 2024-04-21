import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  adminId: number;

  setAdminId(id: number) {
    this.adminId = id;
    localStorage.setItem('adminID',''+id);
  }

  getAdminId(): number {
    const item=localStorage.getItem('adminID');
    this.adminId= +item;
    return this.adminId;
  }
}