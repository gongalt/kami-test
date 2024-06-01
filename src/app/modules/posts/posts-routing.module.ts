import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    data: {
      breadcrumb: 'Posts',
    },
    children: [
      { path: 'post-detail/:id', component: PostDetailsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
