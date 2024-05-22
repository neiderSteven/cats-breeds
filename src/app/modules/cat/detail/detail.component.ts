import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cat } from '../../../shared/interfaces/cat.interface';
import { CatService } from '../../../shared/services/cat.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [CatService]
})

export class DetailComponent implements OnInit {
  cat: any = null;
  adaptabilityPercentage: number = 0;
  childFriendlyPercentage: number = 0;
  affectionLevelPercentage: number = 0;
  groomingPercentage: number = 0;

  constructor(
    private catService: CatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const catId = params.get('id');
      if (catId) {
        this.loadCatDetails(catId);
      }
    });
  }

  loadCatDetails(catId: string): void {
    this.catService.getCatById(catId).subscribe({
      next: (catData: Cat) => this.handleCatData(catData),
      error: (error) => this.handleError(error),
      complete: () => console.info('Cat data fetch complete')
    });
  }

  handleCatData(catData: Cat): void {
    this.cat = catData;
    if (this.cat.breeds && this.cat.breeds.length > 0) {
      const breed = this.cat.breeds[0];
      this.adaptabilityPercentage = this.calculatePercentage(breed.adaptability);
      this.childFriendlyPercentage = this.calculatePercentage(breed.child_friendly);
      this.affectionLevelPercentage = this.calculatePercentage(breed.affection_level);
      this.groomingPercentage = this.calculatePercentage(breed.grooming);
    }
  }

  calculatePercentage(value: number): number {
    return (value / 10) * 100;
  }

  handleError(error: any): void {
    console.error('Error fetching cat:', error);
  }
}