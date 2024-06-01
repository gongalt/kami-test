import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../../shared/shared.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostDetailsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
  ]
})
export class PostsModule { }
