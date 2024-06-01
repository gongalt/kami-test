import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { LoadingService } from '../../shared/services/loading.service';
import { Subscription } from 'rxjs';
import { Post } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  posts: Post[] = [];
  currentPage = 1;
  totalPages = 10;
  postsPerPage = 10;
  totalPosts = 100;
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
      { length: Math.ceil(this.totalPosts / this.postsPerPage) },
      (_, i) => i + 1
    );
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      const searchTerm = params['search'] || '';
      const sortField = params['sortField'] || '';
      const sortDirection = params['sortDirection'] || '';
      this.fetchPosts(this.currentPage, searchTerm, sortField, sortDirection);
    });
  }

  fetchPosts(
    page: number,
    searchTerm?: string,
    sortField?: string,
    sortDirection?: string
  ) {
    this.currentPage = page;
    this.loadingService.show();
    this.subs.add(
      this.dataService
        .getPosts(page, this.postsPerPage, searchTerm, sortField, sortDirection)
        .subscribe((data) => {
          this.posts = data;
          setTimeout(() => {
            this.loadingService.hide();
          }, 1000);
        })
    );
  }

  onSearch(event: Event, searchTerm: string) {
    event.preventDefault();
    this.fetchPosts(this.currentPage, searchTerm);
    this.router.navigate([], {
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(event: any) {
    const sort = event.target?.value;
    const [sortField, sortDirection] = sort.split('_');
    this.fetchPosts(this.currentPage, undefined, sortField, sortDirection);
    this.router.navigate([], {
      queryParams: { sortField, sortDirection },
      queryParamsHandling: 'merge',
    });
  }

  paginate(page: number) {
    this.fetchPosts(page);
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }
  goToPostDetail(postId: number) {
    this.router.navigate(['/posts/post-detail', postId]);
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
}
