import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import { first, skip } from 'rxjs/operators';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isLoading to true when show is called', (done: DoneFn) => {
    service.isLoading.pipe(skip(1), first()).subscribe((value) => {
      expect(value).toBeTrue();
      done();
    });

    service.show();
  });

  it('should set isLoading to false when hide is called', (done: DoneFn) => {
    service.isLoading.pipe(skip(1), first()).subscribe((value) => {
      expect(value).toBeFalse();
      done();
    });
    service.hide();
  });
});