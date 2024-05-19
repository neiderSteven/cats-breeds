import { Component, OnInit } from '@angular/core';
import { CatService } from '../../../shared/services/cat.service';
import { Cat } from '../../../shared/interfaces/cat.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [CatService]
})

export class ListComponent implements OnInit {

  originalCats: Cat[] = [];
  cats: Cat[] = [];
  selectedCat: string = '';
  page: number = 0;

  constructor(
    private catService: CatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCatImages();
  }

  getCatImages(): void {
    this.catService.getCatImages(this.page).subscribe({
      next: (catsData: any[]) => {
        this.originalCats = this.transformCatData(catsData);
        this.cats = [...this.originalCats];
      },
      error: (error) => {
        console.error('Error fetching cat images:', error);
      },
      complete: () => console.info('complete')
    });
  }

  private transformCatData(catsData: any[]): Cat[] {
    return catsData.map((cat: any) => ({
      id: cat?.id,
      name: cat?.breeds[0]?.name,
      imageUrl: cat?.url
    }));
  }

  handleClick(cat: Cat): void {
    this.router.navigate(['/detail', cat.id]);
  }

  onCatChange(): void {
    if (this.selectedCat) {
      this.cats = this.originalCats.filter(cat => cat.name.includes(this.selectedCat));
    } else {
      this.cats = [...this.originalCats];
    }
  }

  loadMoreCats(): void {
    this.page = this.page + 1;
    this.catService.getCatImages(this.page).subscribe({
      next: (catsData: any[]) => {
        const newCats = this.transformCatData(catsData);
        this.cats = [...this.cats, ...newCats];
      },
      error: (error) => {
        console.error('Error fetching more cat images:', error);
      },
      complete: () => console.info('complete')
    });
  }
}