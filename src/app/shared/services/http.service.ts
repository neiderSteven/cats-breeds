import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiUrl: string;
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }

  get<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}/${url}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}/${url}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json'
    });
  }
}