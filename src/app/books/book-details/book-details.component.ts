import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/Book';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

    this.isbn$ = this.route.paramMap
      .pipe(
        map(params => params.get('isbn'))
        );

    // --------

    const observer = {
      next: zahl => console.log(zahl),
      error: e => console.log('ERROR', e),
      complete: () => console.log('Complete!')
    };

    const observable = of(1, 2, 3);

    const subscription = observable.subscribe(observer);

    subscription.unsubscribe();

    // // creation funtions
    // of(1, 2, 3).subscribe(
    //   zahl => console.log(zahl), e => console.log('ERROR', e),
    //   () => console.log('Complete!')
    //   );
  }
}
