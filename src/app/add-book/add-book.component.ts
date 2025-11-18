import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import Router
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Ensure FormsModule is included
  providers: [BookService],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  book: Book = {
    id: "",
    title: '',
    author: '',
    description: '',
    publishedYear: 0,
  };

  constructor(private bookService: BookService, private router: Router) {}

  addBook(): void {
    this.bookService.addBook(this.book).subscribe({
      next: (response) => {
        console.log('Book added successfully!', response);
        this.router.navigate(['/books']); // Navigate back to the book list
      },
      error: (error) => {
        console.error('Error adding book:', error);
      },
    });
  }
}
