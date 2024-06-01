import { Component } from '@angular/core';
import { faDashboard, faNewspaper, faImages, faCameraRetro } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  routes = [
    { path: '/dashboard', name: 'Dashboard', icon: faDashboard },
    { path: '/posts', name: 'Posts', icon: faNewspaper },
    { path: '/albums', name: 'Albums', icon: faImages },
    { path: '/photos', name: 'Photos', icon: faCameraRetro }
  ];
}
