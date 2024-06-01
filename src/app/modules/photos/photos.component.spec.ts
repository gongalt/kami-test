import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Chance } from 'chance';
import { of } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { Component } from '@angular/core';

const chance = new Chance();

@Component({
  selector: 'app-breadcrumb',
  template: ''
})
class BreadcrumbStubComponent {}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotosComponent, BreadcrumbStubComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        DataService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: chance.guid() }),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
