import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Input() pages!: number[];
  @Output() pageChange = new EventEmitter<number>();

  paginate(page: number) {
    this.pageChange.emit(page);
  }
}
