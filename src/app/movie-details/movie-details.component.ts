import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})


export class MovieDetailsComponent {
  constructor(
  @Inject( MAT_DIALOG_DATA) public movie: any,
  public dialogRef: MatDialogRef<MovieDetailsComponent>
  ) { }

  @Input()
  closeDialog(): void {
    this.dialogRef.close();
  }

}
