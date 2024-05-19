import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class CatService {

  constructor(private httpService: HttpService) { }

  /**
   * Obtiene imágenes de gatos de la API.
   * @returns Observable<any[]> Observable que emite un array de imágenes de gatos.
   */
  getCatImages(page: number): Observable<any[]> {
    return this.httpService.get<any[]>(`images/search?has_breeds=true&page=${page}&limit=10`);
  }

  /**
   * Obtiene la información de un gato por su ID.
   * @param id ID del gato.
   * @returns Observable<any> Observable que emite la información del gato.
   */
  getCatById(id: string): Observable<any> {
    return this.httpService.get<any>(`images/${id}`);
  }
}