import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Candidature } from '../../models/candidature.model';
import { catchError, map } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';
import { ResponseMessage } from '../../models/ApiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  private baseUrl = 'http://localhost:8085/api/Candidature';

  constructor(private http: HttpClient, private toastService: ToastService) {}

  getCandidatureList(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.baseUrl}/all`);
  }

  getCandidature(id: number): Observable<Candidature> {
    return this.http.get<Candidature>(`${this.baseUrl}/getone/${id}`);
  }

  createCandidature(candidature: Candidature, userId: number, offreId: number): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/save/${userId}/${offreId}`, candidature).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || 'Une erreur est survenue.';
        this.toastService.show(errorMessage); // Show the error message in the toast
        return throwError({ message: errorMessage });
      })
    );
  }

  updateCandidature(id: number, candidature: Candidature): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, candidature);
  }

  deleteCandidature(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
