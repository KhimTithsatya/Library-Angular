import { Injectable, numberAttribute } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root', // This makes the service available globally
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books'; // Example API URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBook(id: number): Observable<Book> {
    const numericId = Number(id);
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.getBooks().pipe(
      switchMap((books) => {
        // Find the maximum id in the list of books
        const lastId =
          books.length > 0 ? Math.max(...books.map((b) => +b.id)) : 0; // Convert id to number for comparison
        book.id = (lastId + 1).toString(); // Auto-increment the id and convert it to a string
        return this.http.post<Book>(this.apiUrl, book);
      })
    );
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    const numericId = Number(id);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
