import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [BookService],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined; // Book object to hold the details

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
        console.error('Error fetching book details:', error);
      },
    });
  }

  // Navigate back to the book list
  goBack(): void {
    this.router.navigate(['/books']);
  }
}
