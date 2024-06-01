import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { faDashboard, faNewspaper, faImages, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Chance } from 'chance';

const chance = new Chance();

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [ FontAwesomeModule, RouterModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: chance.guid() })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct routes', () => {
    const expectedRoutes = [
      { path: '/dashboard', name: 'Dashboard', icon: faDashboard },
      { path: '/posts', name: 'Posts', icon: faNewspaper },
      { path: '/albums', name: 'Albums', icon: faImages },
      { path: '/photos', name: 'Photos', icon: faCameraRetro }
    ];
    expect(component.routes).toEqual(expectedRoutes);
  });

  it('should display mobile menu when screen size is small', () => {
    const mobileMenu = fixture.debugElement.query(By.css('.navbar-expand-lg'));
    expect(mobileMenu).toBeTruthy();
  });

  it('should display normal menu when screen size is large', () => {
    const normalMenu = fixture.debugElement.query(By.css('.d-none.d-lg-block'));
    expect(normalMenu).toBeTruthy();
  });
});