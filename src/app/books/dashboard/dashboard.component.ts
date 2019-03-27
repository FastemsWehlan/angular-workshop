import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../shared/Book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // ACHTUNG: bei Http werden wir hier ein Problem bekommen
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private service: BookRatingService) {

  }

  doRateDown(book: Book) {

    const ratedBook = this.service.rateDown(book);
    this.updateAndSort(ratedBook);
  }

  doRateUp(book: Book) {

    let ratedBook = this.service.rateUp(book);
    this.updateAndSort(ratedBook);
  }

  updateAndSort(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b)
      .sort((a, b) => b.rating - a.rating);
  }

  ngOnInit() {

    this.books = [{
      isbn: '111',
      title: 'AngularJS',
      description: 'Tolles Buch!',
      rating: 0
    }, {
      isbn: '222',
      title: 'Angular',
      description: 'Super Buch!',
      rating: 0
    }, {
      isbn: '333',
      title: 'React',
      description: 'Geht so!',
      rating: 0
    }, {
      isbn: '444',
      title: 'Keine Angst vor Unix',
      description: 'Standardwerk!',
      rating: 0
    }, {
      isbn: '555',
      title: 'Powershell',
      description: 'Braucht man nicht!',
      rating: 0
    }];

  }
}
