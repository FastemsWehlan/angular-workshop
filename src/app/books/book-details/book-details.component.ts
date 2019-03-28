import { Component, OnInit } from '@angular/core';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/Book';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  isbn: string;
  book: Book;

  constructor(private store: BookStoreService,
     private route: ActivatedRoute) {


  }

  ngOnInit() {

    const r = this.route.paramMap.subscribe((params) => {
      this.isbn = params.get('isbn');
    });

    this.store.getSingle(this.isbn).subscribe((book) => {
      this.book = book;
    });
  }
}
