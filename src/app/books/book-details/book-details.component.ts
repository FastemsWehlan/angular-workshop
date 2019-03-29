import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/Book';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, share, catchError } from 'rxjs/operators';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  isbn$: Observable<string>;
  book$: Observable<Book>;

  constructor(private store: BookStoreService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.book$ = this.route.paramMap
      .pipe(
        map(params => params.get('isbn')),
        switchMap(isbn => this.store.getSingle(isbn)
          .pipe(catchError(e => of({
            isbn: '???',
            title: e.url,
            description: 'Sorry, Justus, Peter und Bob sind gerade nicht in Rocky Beach.',
            rating: -1,
            price: 0.00,
            firstThumbnailUrl: ''
          })),
        )
      )
    );
  }
}
