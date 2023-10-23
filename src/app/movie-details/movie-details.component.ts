import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component representing the movie details dialog.
 */

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})


export class MovieDetailsComponent {

    /**
   * Constructs a new MovieDetailsComponent.
   *
   * @param {any} movie - The movie data to display in the dialog.
   * @param {MatDialogRef<MovieDetailsComponent>} dialogRef - Reference to the dialog.
   */

  constructor(
  @Inject( MAT_DIALOG_DATA) public movie: any,
  public dialogRef: MatDialogRef<MovieDetailsComponent>
  ) { }

/**
 * Component representing the movie details dialog.
 */

  @Input()
  closeDialog(): void {
    this.dialogRef.close();
  }

}
