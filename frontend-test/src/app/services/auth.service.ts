import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:8085/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    return this.http.post<any>(`${API_URL}signin`, credentials, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${API_URL}signup`, user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      errorMessage = `Backend returned code ${error.status}, message was: ${error.error.message || errorMessage}`;
    }
    return throwError(errorMessage);
  }
}
