import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


const API_URL="http://localhost:8085/api/auth/"
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  register(user: any): Observable<any> {
    return this.http.post(API_URL + 'signup', user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(API_URL + 'signin', credentials);
  }

  logout(): Observable<any> {
    return this.http.post(API_URL + 'signout', {});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}