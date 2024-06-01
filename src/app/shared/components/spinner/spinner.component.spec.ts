import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { SpinnerComponent } from './spinner.component';
import { LoadingService } from '../../services/loading.service';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let mockLoadingService;

  beforeEach(async () => {
    mockLoadingService = { isLoading: of(false) };

    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [
        { provide: LoadingService, useValue: mockLoadingService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner', () => {
    const spinnerElement = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should display loading text', () => {
    const loadingText = fixture.debugElement.query(By.css('.sr-only')).nativeElement.textContent;
    expect(loadingText).toBe('Loading...');
  });
});