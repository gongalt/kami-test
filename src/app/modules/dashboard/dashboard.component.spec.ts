import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Chance } from 'chance';
import { of } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { Component } from '@angular/core';

const chance = new Chance();


@Component({
  selector: 'app-spinner',
  template: ''
})
class SpinnerStubComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, SpinnerStubComponent],
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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
