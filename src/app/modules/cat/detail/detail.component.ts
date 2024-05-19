import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cat } from '../../../shared/interfaces/cat.interface';
import { CatService } from '../../../shared/services/cat.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  cat: any = '';

  constructor(
    private catService: CatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idCat = params.get('id');
      if (idCat) {
        this.getCat(idCat);
      }
    });
  }

  getCat(id: string): void {
    this.catService.getCatById(id).subscribe({
      next: (catData: Cat) => {
        this.cat = catData;
      },
      error: (error) => {
        console.error('Error fetching cat:', error);
      },
      complete: () => console.info('complete')
    });
  }
}
