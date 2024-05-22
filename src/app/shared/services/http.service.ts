import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiUrl: string;
  private apiKey: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
    this.apiKey = environment.apiKey;
  }

  get<T>(url: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}/${url}`, { headers });
  }

  post<T>(url: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}/${url}`, data, { headers });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json'
    });
  }
}