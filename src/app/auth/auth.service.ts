import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './auth.model';
import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://covid19-novo-invent.herokuapp.com';
  authEmmiter: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  constructor(private http: HttpClient) { }

  addUser(user: IUser) {
    console.log('User: ', user)
    return this.http.post(`${this.url}/signup`, {user})
  }
  getToken(user: IUser) {
    console.log('User: ', user)
    return this.http.post(`${this.url}/login`, {user})
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = decode(token);
      console.log('tokenPayload: ', tokenPayload)
      if (Date.now() >= tokenPayload.exp * 1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.authEmmiter.next(1);
        return false;
      } else {
        this.authEmmiter.next(2);
        return true;
      }
    } else {
      this.authEmmiter.next(3);
      return false;
    }
  }
}
