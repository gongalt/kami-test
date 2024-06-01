import { LoadingService } from './../../../../shared/services/loading.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../../shared/models';
import { DataService } from '../../../../shared/services/data.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  post!: Post;
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
      this.dataService.getPost(this.id).subscribe((value) => {
        if (value) {
          this.post = value;
        } else {
          this.router.navigate(['/posts']);
        }
      })
    );
  }
  goBack() {
    this.location.back();
  }
}