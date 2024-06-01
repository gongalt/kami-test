import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Album } from '../../shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss',
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
    this.loadingService.show();
    this.pages = Array.from(
      { length: Math.ceil(this.totalAlbums / this.albumsPerPage) },
      (_, i) => i + 1
    );
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      const searchTerm = params['search'] || '';
      const sortField = params['sortField'] || '';
      const sortDirection = params['sortDirection'] || '';
      this.fetchAlbums(this.currentPage, searchTerm, sortField, sortDirection);
    });
  }

  fetchAlbums(
    page: number,
    searchTerm?: string,
    sortField?: string,
    sortDirection?: string
  ) {
    this.currentPage = page;
    this.loadingService.show();
    this.subs.add(
      this.dataService
        .getAlbums(
          page,
          this.albumsPerPage,
          searchTerm,
          sortField,
          sortDirection
        )
        .subscribe((data) => {
          this.albums = data;
          setTimeout(() => {
            this.loadingService.hide();
          }, 1000);
        })
    );
  }

  onSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    this.fetchAlbums(this.currentPage, searchTerm);
    this.router.navigate([], {
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(event: any) {
    const sort = event.target?.value;
    const [sortField, sortDirection] = sort.split('_');
    this.fetchAlbums(this.currentPage, undefined, sortField, sortDirection);
    this.router.navigate([], {
      queryParams: { sortField, sortDirection },
      queryParamsHandling: 'merge',
    });
  }

  paginate(page: number) {
    this.fetchAlbums(page);
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  gotoAlbumDetail(albumId: number) {
    this.router.navigate(['/albums/album-detail', albumId]);
  }

  onActivate() {
    setTimeout(() => {
      this.shouldShowContent = false;
    }, 0);
  }

  onDeactivate() {
    setTimeout(() => {
      this.shouldShowContent = true;
    }, 0);
  }

  generateRandomBoxes(n: number): number[] {
    return Array.from({ length: n }, () => Math.floor(Math.random() * n));
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
