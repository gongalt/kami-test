import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../../shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {
  private subs: Subscription = new Subscription();
  albums: Album[] = [];
  currentPage = 1;
  totalPages = 10;
  albumsPerPage = 10;
  totalAlbums = 100;
  pages: number[] = [];
  shouldShowContent = true;

  constructor(
    private dataService: DataService,
    public loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadingService.show();
    // this.pages = Array.from(
    //   { length: Math.ceil(this.totalAlbums / this.albumsPerPage) },
    //   (_, i) => i + 1
    // );
    // this.route.queryParams.subscribe((params) => {
    //   this.currentPage = +params['page'] || 1;
    //   const searchTerm = params['search'] || '';
    //   const sortField = params['sortField'] || '';
    //   const sortDirection = params['sortDirection'] || '';
    //   // this.fetchPosts(this.currentPage, searchTerm, sortField, sortDirection);
    // });
  }
}
