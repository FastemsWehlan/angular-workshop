import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let rateUpWasCalled = false;

  beforeEach(async(() => {

    const bookRatingMock = {
      rateUp: (book) => { rateUpWasCalled = true; return book; },
      rateDown: (book) => { return book; }
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        BookComponent  // Integration Test
      ],
      providers: [
        {
          provide: BookRatingService,
          useValue: bookRatingMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('doRateUp() should forward the execution to BookRatingService', () => {

    let testBook = {
      isbn: '000',
      title: 'TEST',
      description: '...',
      rating: 0
    };

    component.doRateUp(testBook);
    expect(rateUpWasCalled).toBe(true);
  });
});
