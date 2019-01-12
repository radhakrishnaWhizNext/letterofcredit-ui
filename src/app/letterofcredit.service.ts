import { Injectable } from '@angular/core';
import { Letterofcredit } from './letterofcredit';
import { LOCS } from './mock-locs';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LetterofcreditService {

  constructor(private http: HttpClient,
              private messageService: MessageService
             ) { }

  private locsUrl = 'api/locs';  // URL to web api

  private log(message: string) {
    this.messageService.add(`LetterofcreditService: ${message}`);
  }


  getLocs(): Observable<Letterofcredit[]> {
    //this.messageService.add('LetterofcreditService: fetched Locs');
    return this.http.get<Letterofcredit[]>(this.locsUrl).pipe(
            tap(_ => this.log('fetched Locs')),
            catchError(this.handleError('getLocs', []))
          );
  }

  getLoc(id: number): Observable<Letterofcredit> {
    //this.messageService.add(`LetterofcreditService: fetched Loc id=${id}`);
    const url = `${this.locsUrl}/${id}`;
    return this.http.get<Letterofcredit>(url).pipe(
      tap(_ => this.log(`fetched LOC id=${id}`)),
      catchError(this.handleError<Letterofcredit>(`getLoc id=${id}`))
    );

  }

  updateLocStatus (loc: Letterofcredit): Observable<any> {
    return this.http.put(this.locsUrl, loc, httpOptions).pipe(
      tap(_ => this.log(`updated LOC id=${loc.locId}`)),
      catchError(this.handleError<any>('updateLocStatus'))
    );
  }

  addLoc (loc: Letterofcredit): Observable<Letterofcredit> {
    return this.http.post<Letterofcredit>(this.locsUrl, loc, httpOptions).pipe(
      tap((loc: Letterofcredit) => this.log(`added LOC w/ id=${loc.locId}`)),
      catchError(this.handleError<Letterofcredit>('addLoc'))
    );
  }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}
