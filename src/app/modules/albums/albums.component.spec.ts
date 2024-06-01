import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsComponent } from './albums.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Chance } from 'chance';
import { of } from 'rxjs';

const chance = new Chance();

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
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
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
