import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLayoutComponent } from './shared/layouts/general-layout/general-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GeneralLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
          },
          {
            path: 'posts',
            loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule),
          },
          {
            path: 'albums',
            loadChildren: () => import('./modules/albums/albums.module').then((m) => m.AlbumsModule),
          },
          {
            path: 'photos',
            loadChildren: () => import('./modules/photos/photos.module').then((m) => m.PhotosModule),
          },

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
