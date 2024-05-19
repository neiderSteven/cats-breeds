import { Routes } from '@angular/router';
import { ListComponent } from './modules/cat/list/list.component';
import { HomeComponent } from './modules/home/home.component';
import { DetailComponent } from './modules/cat/detail/detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ListComponent },
    { path: 'detail/:id', component: DetailComponent }
  ];
