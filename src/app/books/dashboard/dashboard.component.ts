import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/Book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // ACHTUNG: bei Http werden wir hier ein Problem bekommen
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private service: BookRatingService, private store: BookStoreService) { }

  /*
  "Hausaufgabe" on:
    Erweitere das Buch-Interface im ein Thumbnail
    informiere dich über die Verfügbaren Properties mithilfe von Swagger UI
    erweitere das Interface Book
    zeige das Thumbnail anstelle der Katzen an!
  */

  ngOnInit() {
    this.store.getAll().subscribe((books) => {
      this.books = books;
    });
  }

  doRateDown(book: Book) {
    const ratedBook = this.service.rateDown(book);
    this.updateAndSort(ratedBook);
  }

  doRateUp(book: Book) {
    let ratedBook = this.service.rateUp(book);
    this.updateAndSort(ratedBook);
  }

  doAddBook(newBook: Book) {
    this.books = [ ...this.books, newBook];
    this.updateAndSort(newBook);
  }

  updateAndSort(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }
}
