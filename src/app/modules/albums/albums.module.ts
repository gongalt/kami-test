import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './albums.component';
import { SharedModule } from '../../shared/shared.module';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';



@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumDetailComponent
  ],
  imports: [
    CommonModule,
    AlbumsRoutingModule,
    SharedModule,
  ]
})
export class AlbumsModule { }
