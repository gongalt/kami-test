import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Subscription } from 'rxjs';
import { Post, Album, Photo } from '../../shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  posts: Post[] = [];
  albums: Album[] = [];
  photos: Photo[] = [];

  postCount: number = 0;
  albumCount: number = 0;
  photoCount: number = 0;

  constructor(
    private dataService: DataService,
    public loadingService: LoadingService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.subs.add(
      this.dataService.getPosts().subscribe((data) => {
        this.posts = data;
        this.postCount = data.length
      })
    );

    this.subs.add(
      this.dataService.getAlbums().subscribe((data) => {
        this.albums = data;
        this.albumCount = data.length;
      })
    );

    this.subs.add(
      this.dataService.getPhotos().subscribe((data) => {
        this.photos = data;
        this.loadingService.hide();
        this.photoCount = data.length;
      })
    );
  }


}
