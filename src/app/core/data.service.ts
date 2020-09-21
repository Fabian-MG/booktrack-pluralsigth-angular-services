import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { allBooks, allReaders } from "app/data";
import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { Observable, throwError } from "rxjs";
import { BooktrackerPage } from "../../../e2e/app.po";
import { LoggerService } from "./logger.service";
import { catchError } from "rxjs/operators";

import { BookTrackerError } from "../models/bookTrackerError";

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http
      .get<Reader[]>("/api/readers")
      .pipe(catchError(this.hanldeError));
  }

  private hanldeError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error ocurred retrieving data";
    return throwError(dataError);
  }

  getAuthorRecommendation(readerID: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readerID > 0) {
          resolve("Dr. Seuss");
        } else {
          reject("Invalid reader ID");
        }
      }, 2000);
    }); 
  }

  getReaderById(id: number): Reader {
    return allReaders.find((reader) => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find((book) => book.bookID === id);
  }

  setMostPopularBook(book: Book): void {
    this.mostPopularBook = book;
  }
}
