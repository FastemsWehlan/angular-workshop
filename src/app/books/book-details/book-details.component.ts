import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/Book';
import { ActivatedRoute } from '@angular/router';
import { of, Observable, Subscriber } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

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

    const observable$ = new Observable<number>(subscriber => {
      subscriber.next(2);
      subscriber.next(4);
      subscriber.next(6);
      subscriber.complete();
      window.setTimeout(() => subscriber.next(99), 2000);
    });

    const subscription = observable$
      .pipe(
        map(x => x * 10),       // 20, 40, 60
        filter(x => x > 20),    // 40, 60
        scan((a,b) => a + b)    // 100, 40
      )
      .subscribe(observer);

    window.setTimeout(() => subscription.unsubscribe(), 2000);

    // subscription.unsubscribe();

    // // creation funtions
    // of(1, 2, 3).subscribe(
    //   zahl => console.log(zahl), e => console.log('ERROR', e),
    //   () => console.log('Complete!')
    //   );
  }
}
