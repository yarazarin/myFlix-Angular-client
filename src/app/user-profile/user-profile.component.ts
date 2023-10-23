import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

/**
 * Component representing the user profile.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  /**
   * The user's data.
   */
  user: any = {};

  /**
   * Input data for user profile containing Username, Password, Email, and Birthday.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs a new UserProfileComponent.
   *
   * @param {FetchApiDataService} fetchApiData - The service for making API requests.
   * @param {MatSnackBar} snackBar - The snackbar for displaying messages.
   * @param {Router} router - The Angular router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Lifecycle hook: Executes when the component is initialized.
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches the user's data and populates the input fields.
   */
  getUser(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
  }

  /**
   * Initiates the user profile update.
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      this.snackBar.open('User successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Initiates the user deletion process.
   */
  // deleteUser(): void {
  //   this.fetchApiData.deleteUser().subscribe((result) => {
  //     localStorage.clear();
  //     this.router.navigate(['welcome']);
  //     this.snackBar.open('User successfully deleted', 'OK', {
  //       duration: 2000
  //     });
  //   }, (result) => {
  //     this.snackbar.open(result, 'OK', {
  //       duration: 2000
  //     });
  //   });
  // }
}
