import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [BookService],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book: Book = {
    id: '',
    title: '',
    author: '',
    description: '',
    publishedYear: 0,
  };

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the book ID from the route parameters
    const id = this.route.snapshot.params['id'];
    this.loadBook(id);
  }

  // Fetch the book details by ID
  loadBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (data) => {
        this.book = data;
      },
      error: (error) => {
        console.error('Error fetching book:', error);
      },
    });
  }

  // Update the book
  updateBook(): void {
    const id = this.book.id;
    this.bookService.updateBook(id, this.book).subscribe({
      next: () => {
        console.log('Book updated successfully!');
        this.router.navigate(['/books']); // Navigate back to the book list
      },
      error: (error) => {
        console.error('Error updating book:', error);
      },
    });
  }
  goBack(): void {
    this.router.navigate(['/books']);
  }
}
