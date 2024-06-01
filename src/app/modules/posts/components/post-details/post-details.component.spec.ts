import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Chance } from 'chance';
import { of } from 'rxjs';
import { DataService } from '../../../../shared/services/data.service';
import { Location } from '@angular/common';
import { LoadingService } from '../../../../shared/services/loading.service';

const chance = new Chance();

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;
  let mockDataService = {
    getPost: jasmine.createSpy('getPost').and.returnValue(of(null))
  };
  let mockLocation: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
    mockLoadingService = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);
    mockLocation = jasmine.createSpyObj<Location>('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: DataService, useValue: mockDataService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: Location, useValue: mockLocation },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: chance.integer({min: 1, max: 10}) }),
            snapshot: {
              paramMap: {
                get: () => chance.guid(),
              },
            },
          },
        },
      ],
    })
    .compileComponents();

    mockDataService.getPost.calls.reset();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get post on init', () => {
    const postId = '7';
    const post ={
      id: parseInt(postId, 10),
      userId: chance.integer({ min: 1, max: 10 }),
      title: chance.sentence(),
      body: chance.paragraph(),
    };
    mockDataService.getPost.and.returnValue(of(post));

    component.id = postId;
    component.getDetails();

    expect(mockDataService.getPost).toHaveBeenCalledWith(postId);
    expect(component.post).toEqual(post);
  });

  it('should navigate to /posts if post is not found', () => {
    mockDataService.getPost.and.returnValue(of(null));

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/posts']);
  });

  it('should go back when goBack is called', () => {
    component.goBack();

    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const spy = spyOn(component.subs, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});