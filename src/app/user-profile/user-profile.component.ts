import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};

  favoriteMovies: any[] = [];



  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((response: any) => {
      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.user.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');


      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
      })
    })
  }

  
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('Username', data.Username);
      // console.log(data);
      this.snackBar.open('User has been updated', 'OK', {
        duration: 2000
      })
      window.location.reload();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      })
    });
  }


  deleteUser(): void {
    if (confirm('are you sure?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'deleted!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }

  
}