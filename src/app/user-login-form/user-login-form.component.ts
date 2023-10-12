// user-login-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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
