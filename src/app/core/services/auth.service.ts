import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true',
  );
  readonly isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(data: LoginUser) {
    const formData = new FormData();
    formData.set(`username`, data.username);
    formData.set(`password`, data.password);
    return this.http.post('/login', formData).pipe(
      tap(() => {
        this.isLoggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true');
      }),
    );
  }

  getCurrentUser() {
    return this.http.get<User>('/api/me');
  }

  logout() {
    return this.http.post('/logout', null).pipe(
      tap(() => {
        this.isLoggedIn.next(false);
        localStorage.removeItem('isLoggedIn');
      }),
    );
  }
}
