import { NgModule } from '@angular/core';
import { AlbumsComponent } from './albums.component';
import { Routes, RouterModule } from '@angular/router';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
    children: [
      { path: 'album-detail/:id', component: AlbumDetailComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsRoutingModule { }
