import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class CatService {

  constructor(private httpService: HttpService) { }

  getCatImages(page: number): Observable<any[]> {
    return this.httpService.get<any[]>(`breeds?limit=10&page=${page}`);
  }

  getCatById(id: string): Observable<any> {
    return this.httpService.get<any>(`images/${id}`);
  }
}