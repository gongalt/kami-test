import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { GeneralLayoutComponent } from './general-layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: ''
})
class SidebarStubComponent {}

describe('GeneralLayoutComponent', () => {
  let component: GeneralLayoutComponent;
  let fixture: ComponentFixture<GeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralLayoutComponent, SidebarStubComponent],
      imports: [RouterModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});