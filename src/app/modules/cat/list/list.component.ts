import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../shared/services/cat.service';
import { Cat } from '../../../shared/interfaces/cat.interface';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CatService]
})

export class ListComponent implements OnInit {

  catCtrl = new FormControl();
  catFilterCtrl = new FormControl();
  originalCats: Cat[] = [];
  itemsMenu: Cat[] = [];
  cats: Cat[] = [];
  page: number = 0;
  showMore: boolean = true;

  constructor(
    private catService: CatService,
    private router: Router
  ) {
    this.catFilterCtrl.valueChanges.subscribe(breed => this._filterBreeds(breed));
    this.catCtrl.valueChanges.subscribe(breed => this._filterCats(breed));
  }

  private _filterBreeds(value: string) {
    this.itemsMenu = value
      ? this.originalCats.filter(cat => cat.name.toLowerCase().includes(value.toLowerCase()))
      : [...this.originalCats];
  }

  private _filterCats(value: string) {
    this.cats = value
      ? this.originalCats.filter(cat => cat.name.toLowerCase().includes(value.toLowerCase()))
      : [...this.originalCats];
  }

  ngOnInit(): void {
    this.loadCatImages();
  }

  loadCatImages(): void {
    this.catService.getCatImages(this.page).subscribe({
      next: (catsData: any[]) => this.handleCatsData(catsData),
      error: (error) => this.handleError(error)
    });
  }

  handleCatsData(catsData: any[]): void {
    const transformedCats = this.transformCatData(catsData);
    this.itemsMenu = [...this.itemsMenu, ...transformedCats];
    this.originalCats = [...this.originalCats, ...transformedCats];
    this.cats = [...this.originalCats];
    if (catsData.length === 0) {
      this.showMore = false;
    }
  }

  handleError(error: any): void {
    console.error('Error fetching cat images:', error);
  }

  transformCatData(catsData: any[]): Cat[] {
    return catsData.map((cat: any) => ({
      id: cat?.image?.id,
      name: cat?.name,
      breeds: [{
        name: cat?.name,
        description: cat?.description,
        temperament: cat?.temperament,
        origin: cat?.origin,
        adaptability: cat?.adaptability || 0,
        child_friendly: cat?.child_friendly || 0,
        affection_level: cat?.affection_level || 0,
        grooming: cat?.grooming || 0,
        wikipedia_url: cat?.wikipedia_url || ''
      }],
      imageUrl: cat?.image?.url
    }));
  }

  onCatClick(cat: Cat): void {
    this.router.navigate(['/detail', cat.id]);
  }

  loadMoreCats(): void {
    this.page++;
    this.loadCatImages();
  }
}