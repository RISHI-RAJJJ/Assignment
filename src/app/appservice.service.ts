import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  // handleError: (err: any, caught: Observable<Object>) => never;
  

  constructor(private httpClient: HttpClient ) { }

  postFile(fileToUpload: File): Observable<Object> {
    const endpoint = 'https://api.imagga.com/v2/tags';
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: new HttpHeaders()
        .set('Authorization', 'Basic YWNjXzliM2M5MDhmYjk1ZTdlMDozOTYyNWE4Y2Q1YmFiNjU4OGY4ZmI1YmRiZTEwYTNlOA==') })
        .pipe(
          catchError(this.handleError) // then handle the error
         );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}
}
