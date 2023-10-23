import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://evening-inlet-09970.herokuapp.com/';
/**
 * Service for making API requests to interact with the backend.
 */

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   *
   * @param {any} userDetails - The user details to register.
   * @returns {Observable<any>} The result of the registration process.
   */

  userRegistration(userDetails: any): Observable<any> {
    const url = `${apiUrl}users`;
    return this.http.post(url, userDetails).pipe(catchError(this.handleError));
  }
  


 /**
   * Logs in a user.
   *
   * @param {{ Username: string, Password: string }} credentials - The user's login credentials.
   * @returns {Observable<any>} The result of the login process.
   */

  userLogin(credentials: { Username: string, Password: string }): Observable<any> {
    const url = `${apiUrl}login`; // Construct the complete URL
    return this.http.post<any>(url, credentials).pipe(catchError(this.handleError));
  }

  /**
   * Retrieves a list of all movies.
   *
   * @returns {Observable<any>} The list of all movies.
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a single movie.
   *
   * @param {string} title - The title of the movie to fetch.
   * @returns {Observable<any>} Information about the movie.
   */

    getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a movie director.
   *
   * @param {string} directorName - The name of the director.
   * @returns {Observable<any>} Information about the director.
   */
  
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a movie genre.
   *
   * @param {string} genreName - The name of the genre.
   * @returns {Observable<any>} Information about the genre.
   */

  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a user.
   *
   * @returns {Observable<any>} Information about the user.
   */


  getOneUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves a user's favorite movies.
   *
   * @returns {Observable<any>} The user's favorite movies.
   */


  getFavoriteMovies(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), map((data) => data.FavoriteMovies), catchError(this.handleError));
  }

  /**
   * Adds a movie to a user's list of favorite movies.
   *
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} The result of adding the movie to favorites.
   */


  addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edits a user's information.
   *
   * @param {any} updatedUser - The updated user information.
   * @returns {Observable<any>} The result of editing the user information.
   */

    /**
   * Deletes a user's account.
   *
   * @returns {Observable<any>} The result of deleting the user account.
   */

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a user's account.
   *
   * @returns {Observable<any>} The result of deleting the user account.
   */


  // deleteUser(): Observable<any> {
  //   const userid = localStorage.getItem('userid');
  //   const token = localStorage.getItem('token');
  //   return this.http.delete(apiUrl + 'users/' + userid, {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer ' + token,
  //     }),
  //   }).pipe(map(this.extractResponseData), catchError(this.handleError));
  // }

  /**
   * Deletes a movie from a user's list of favorite movies.
   *
   * @param {string} movieId - The ID of the movie to remove from favorites.
   * @returns {Observable<any>} The result of deleting the movie from favorites.
   */

  deleteFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Wrong! please try again later.'));
  }
}
