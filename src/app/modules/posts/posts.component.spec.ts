import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Chance } from 'chance';
import { of } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { By } from '@angular/platform-browser';

const chance = new Chance();
@Component({
  selector: 'app-breadcrumb',
  template: '',
})
class BreadcrumbStubComponent {}
@Component({
  selector: 'app-pagination',
  template: '',
})
class PaginationStubComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() pages!: number[];
  @Output() pageChange = new EventEmitter<number>();
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let mockDataService: any;
  let mockLoadingService;
  let mockRouter: any;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['getPosts']);
    mockDataService.getPosts.and.returnValue(of([]));
    mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [
        PostsComponent,
        BreadcrumbStubComponent,
        PaginationStubComponent,
      ],
      imports: [RouterModule.forRoot([])],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: DataService, useValue: mockDataService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: chance.guid() }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call fetchPosts on ngOnInit', () => {
    spyOn(component, 'fetchPosts');
    component.ngOnInit();
    expect(component.fetchPosts).toHaveBeenCalled();
  });

  it('should call dataService.getPosts in fetchPosts', () => {
    component.fetchPosts(1);
    expect(mockDataService.getPosts).toHaveBeenCalled();
  });

  it('should call fetchPosts and navigate on search', () => {
    const searchTerm = 'test';
    const event = new Event('click');
    spyOn(component, 'fetchPosts');

    component.onSearch(event, searchTerm);

    expect(component.fetchPosts).toHaveBeenCalledWith(
      component.currentPage,
      searchTerm
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { search: searchTerm },
      queryParamsHandling: 'merge',
    });
  });

  it('should call fetchPosts and navigate on sort change', () => {
    const event = { target: { value: 'field_direction' } };

    spyOn(component, 'fetchPosts');

    component.onSortChange(event);

    expect(component.fetchPosts).toHaveBeenCalledWith(
      component.currentPage,
      undefined,
      'field',
      'direction'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { sortField: 'field', sortDirection: 'direction' },
      queryParamsHandling: 'merge',
    });
  });

  it('should call fetchPosts and navigate on paginate', () => {
    const page = 2;
    spyOn(component, 'fetchPosts');

    component.paginate(page);

    expect(component.fetchPosts).toHaveBeenCalledWith(page);
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  });

  it('should navigate to post detail', () => {
    const postId = 1;

    component.goToPostDetail(postId);

    expect(mockRouter.navigate).toHaveBeenCalledWith([
      '/posts/post-detail',
      postId,
    ]);
  });

  it('should set shouldShowContent to false on activate', (done) => {
    component.onActivate();

    setTimeout(() => {
      expect(component.shouldShowContent).toBe(false);
      done();
    }, 0);
  });

  it('should set shouldShowContent to true on deactivate', (done) => {
    component.onDeactivate();

    setTimeout(() => {
      expect(component.shouldShowContent).toBe(true);
      done();
    }, 0);
  });

  it('should call onSearch when form is submitted', () => {
    const searchInput = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    searchInput.value = 'test';
    spyOn(component, 'onSearch');

    const mockEvent = new Event('submit');
    fixture.debugElement
      .query(By.css('form'))
      .triggerEventHandler('submit', mockEvent);

    expect(component.onSearch).toHaveBeenCalledWith(mockEvent, 'test');
  });

  it('should call onSortChange when select value is changed', () => {
    spyOn(component, 'onSortChange');

    fixture.debugElement
      .query(By.css('select'))
      .triggerEventHandler('change', { target: { value: 'title_asc' } });

    expect(component.onSortChange).toHaveBeenCalledWith({
      target: { value: 'title_asc' },
    });
  });

  it('should call goToPostDetail when table row is clicked', () => {
    component.posts = [
      {
        id: chance.integer({ min: 1, max: 10 }),
        userId: chance.integer({ min: 1, max: 10 }),
        title: chance.sentence(),
        body: chance.paragraph(),
      },
    ];
    fixture.detectChanges();

    const postId = component.posts[0].id;
    spyOn(component, 'goToPostDetail');

    fixture.debugElement
      .query(By.css('tbody tr'))
      .triggerEventHandler('click', null);

    expect(component.goToPostDetail).toHaveBeenCalledWith(postId);
  });

  it('should call paginate when pageChange event is emitted', () => {
    spyOn(component, 'paginate');

    fixture.debugElement
      .query(By.directive(PaginationStubComponent))
      .triggerEventHandler('pageChange', 2);

    expect(component.paginate).toHaveBeenCalledWith(2);
  });

  it('should call onActivate when activate event is emitted', () => {
    spyOn(component, 'onActivate');

    fixture.debugElement
      .query(By.css('router-outlet'))
      .triggerEventHandler('activate', null);

    expect(component.onActivate).toHaveBeenCalled();
  });

  it('should call onDeactivate when deactivate event is emitted', () => {
    spyOn(component, 'onDeactivate');

    fixture.debugElement
      .query(By.css('router-outlet'))
      .triggerEventHandler('deactivate', null);

    expect(component.onDeactivate).toHaveBeenCalled();
  });
});
