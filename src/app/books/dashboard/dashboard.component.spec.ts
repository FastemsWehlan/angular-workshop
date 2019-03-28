import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';
import { Input, Component } from '@angular/core';

@Component({
  selector: 'br-book',
  template: ';-)'
})
export class TestBookComponent {
  @Input() book: Book;
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {

    const bookRatingMock = {
      rateUp: book => book,
      rateDown: book => book
    };

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TestBookComponent
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doRateUp() should forward the execution to BookRatingService', () => {

    const rs = TestBed.get(BookRatingService);
    spyOn(rs, 'rateUp').and.callThrough();

    const testBook = {
      isbn: '000',
      title: 'TEST',
      description: '...',
      rating: 0
    };

    component.doRateUp(testBook);
    expect(rs.rateUp).toHaveBeenCalled();
  });

  it('doRateUp should call updateList', () => {
    spyOn(component, 'updateAndSort');
    component.doRateUp({ isbn: '000' } as Book);
    expect(component.updateAndSort).toHaveBeenCalled();
  });

});
