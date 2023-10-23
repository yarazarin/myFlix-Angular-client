import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Represents the Movie Card Component.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * An array that stores the list of movies.
   */
  movies: any[] = [];

  /**
   * Constructs a new MovieCardComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for fetching movie data.
   * @param {MatDialog} dialog - The dialog service for opening movie details.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook: Executes when the component is initialized.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches a list of movies from the API and stores them in the 'movies' property.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Opens a dialog to display movie details.
   *
   * @param {any} movie - The movie object to display details for.
   */
  openMovieDetailsDialog(movie: any): void {
    const dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '400px',
      data: movie,
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
