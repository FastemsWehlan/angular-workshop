import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/Book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[] = [];

  constructor(private service: BookRatingService) {
    debugger;
  }

  ngOnInit() {

    this.books = [{
      isbn: '111',
      title: 'AngularJS',
      description: 'Tolles Buch!',
      rating: 3
    }, {
      isbn: '222',
      title: 'Angular',
      description: 'Super Buch!',
      rating: 5
    }, {
      isbn: '333',
      title: 'React',
      description: 'Geht so!',
      rating: 1
    }, {
      isbn: '444',
      title: 'Keine Angst vor Unix',
      description: 'Standardwerk!',
      rating: 4
    }, {
      isbn: '555',
      title: 'Powershell',
      description: 'Braucht man nicht!',
      rating: 0
    }];
  }
}
