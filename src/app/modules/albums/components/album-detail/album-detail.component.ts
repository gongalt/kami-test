import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from '../../../../shared/models';
import { DataService } from '../../../../shared/services/data.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent {
  album!: Album;
  id!: string | null;

  subs: Subscription = new Subscription();

  constructor(private location: Location, private dataService: DataService, public loadingService: LoadingService, private router: Router, private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDetails();
  }


  getDetails() {
    this.subs.add(
      this.dataService.getAlbum(this.id).subscribe((value) => {
        if (value) {
          this.album = value;
        } else {
          this.router.navigate(['/albums']);
        }
      })
    );
  }
  goBack() {
    this.location.back();
  }

  generateRandomBoxes(n: number): number[] {
    return Array.from({ length: n }, () => Math.floor(Math.random() * n));
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
