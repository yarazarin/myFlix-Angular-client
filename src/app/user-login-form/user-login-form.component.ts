import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component representing the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input data for user login containing Username and Password.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructs a new UserLoginFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the login form dialog.
   * @param {MatSnackBar} snackBar - The snackbar for displaying messages.
   * @param {Router} router - The Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Lifecycle hook: Executes when the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Initiates the user login process.
   */
  login(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open(
          'Login failed. Please check your credentials and try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
