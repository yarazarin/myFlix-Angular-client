import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})


export class MovieDetailsComponent {
  
  @Input() movie: any;
    constructor(public dialogRef: MatDialogRef<MovieDetailsComponent>) { }
    
    @Input()
  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
