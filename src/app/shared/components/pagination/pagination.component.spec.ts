import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.currentPage = 1;
    component.totalPages = 5;
    component.pages = [1, 2, 3, 4, 5];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange event when paginate is called', () => {
    spyOn(component.pageChange, 'emit');
    component.paginate(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should display correct number of pages', () => {
    const pageElements = fixture.debugElement.queryAll(
      By.css('.page-item:not(:first-child):not(:last-child)')
    );
    expect(pageElements.length).toBe(component.pages.length);
  });

  it('should disable "Previous" button when currentPage is 1', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.query(
      By.css('.page-item:first-child')
    );
    expect(prevButton.classes['disabled']).toBeTruthy();
  });

  it('should disable "Next" button when currentPage is equal to totalPages', () => {
    component.currentPage = component.totalPages;
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(
      By.css('.page-item:last-child')
    );
    expect(nextButton.classes['disabled']).toBeTruthy();
  });

  it('should mark the correct page number as active', () => {
    component.currentPage = 3;
    fixture.detectChanges();
    const activePage = fixture.debugElement.query(
      By.css('.page-item.active a.page-link')
    );
    expect(activePage.nativeElement.textContent.trim()).toBe('3');
  });
});
