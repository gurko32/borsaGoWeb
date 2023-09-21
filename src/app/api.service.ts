import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { map } from 'rxjs/operators'; // Import map operator

import { Stock } from './Stock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.collectapi.com/economy/hisseSenedi'; // Replace with your actual API endpoint

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'apikey 2qdTcuOx8JYFvrLXsiB1va:2HRWSrsgiV6C4GQXFeSpoF', // Replace with your actual access token
    }),
  };

  constructor(private http: HttpClient) {}
  getData(): Observable<Stock[]> {
    return this.http.get<any>(this.apiUrl, this.httpOptions).pipe(
      map((response) =>
        response.result.map(
          (stockData: any) =>
            new Stock(
              stockData.rate,
              stockData.lastprice,
              stockData.lastpricestr,
              stockData.hacim,
              stockData.hacimstr,
              stockData.min,
              stockData.minstr,
              stockData.max,
              stockData.maxstr,
              new Date(stockData.time), // Assuming time is a string representation of date
              stockData.text,
              stockData.code
            )
        )
      )
    );
  }

  //   getData(): Observable<Stock> {
  //     console.log('headers');
  //     console.log(this.httpOptions);
  //     return this.http
  //       .get<any>(this.apiUrl, this.httpOptions)
  //       .pipe(catchError(this.handleError));
  //   }

  private handleError(error: any) {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
