import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from '../models/user.model';
import { Page } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(page: number, size: number) {
    const queryParams = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<User>>('/api/users', { params: queryParams });
  }

  getById(userId: number) {
    return this.http.get<User>(`/api/users/${userId}`);
  }

  create(body: CreateUserRequest) {
    return this.http.post('/api/users', body);
  }

  update(userId: number, body: UpdateUserRequest) {
    return this.http.put(`/api/users/${userId}`, body);
  }

  delete(userId: number) {
    return this.http.delete(`/api/users/${userId}`);
  }
}
