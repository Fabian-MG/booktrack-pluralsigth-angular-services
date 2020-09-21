import { Component, OnInit } from "@angular/core";

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from "app/core/data.service";
import { LoggerService } from "app/core/logger.service";
import { BookTrackerError } from "app/models/bookTrackerError";
import { stringify } from "querystring";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styles: [],
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService
  ) {
    this.loggerService.log("Creating dashboard");
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();

    this.dataService.getAllReaders().subscribe(
      (data: Reader[]) => (this.allReaders = data),
      (err: BookTrackerError) => console.log(err.friendlyMessage),
      () => this.loggerService.log("All done getting readers!")
    );

    this.dataService.getAuthorRecommendation(1).then(
      (author: string) => this.loggerService.log(author),
      (err: string) =>
        this.loggerService.log(`The promise was rejected: ${err}`)
    );

    this.mostPopularBook = this.dataService.mostPopularBook;
    this.loggerService.log("Done with dashboar initization");
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    try {
      let author: string = await this.dataService.getAuthorRecommendation(
        readerID
      );
      this.loggerService.log(author);
    } catch (error) {
      this.loggerService.error(error);
    }
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
