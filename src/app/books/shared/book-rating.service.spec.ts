import { BookRatingService } from './book-rating.service';
import { Book } from './Book';

describe('BookRatingService', () => {

  // Arrange
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    service = new BookRatingService();
    book = {
      isbn: '000',
      title: 'Test',
      description: '',
      rating: 3
    };
  });


  it('should increase the rating by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should decrease the rating by one', () => {
      const ratedBook = service.rateDown(book);
      expect(ratedBook.rating).toBe(2);
    });

  it('should do not be allowed to have a rating greater than 5', () => {
      book.rating = 5;
      const ratedBook = service.rateUp(book);
      expect(ratedBook.rating).toBe(5);
    });

  it('should do not be allowed to have a rating lower than 1', () => {
      book.rating = 1;
      const ratedBook = service.rateDown(book);
      expect(ratedBook.rating).toBe(1);
    });

  it('should always return a new book instance', () => {
      const ratedBook = service.rateUp(book);
      expect(ratedBook).not.toBe(book); // assuming immutability here
    });
});
