import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components = [
  GeneralLayoutComponent,
  SidebarComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class LayoutsModule { }
