import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component representing the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for user registration containing Username, Password, Email, and Birthday.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs a new UserRegistrationFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the registration form dialog.
   * @param {MatSnackBar} snackBar - The snackbar for displaying messages.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }
  
  /**
   * Lifecycle hook: Executes when the component is initialized.
   */
  ngOnInit(): void {
  }

  /**
   * Initiates the user registration process.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here
      this.dialogRef.close(); // This will close the modal on success.
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
