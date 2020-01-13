import { Injectable, Inject } from '@angular/core';
import { Relative } from '../model/relative';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Relative2 } from '@app/model/relative2';

@Injectable({
  providedIn: 'root'
})
export class RelativeService {

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private url: string) { }

// Observable
getAllRelatives(customerId): Observable<Relative[]> {
return this.http.get<Relative[]>('http://localhost:8080/customers/' + customerId + '/relatives');
}

// Observable
 getRelative(customerId, relativeId): Observable<Relative> {
   return this.http.get<Relative>('http://localhost:8080/customers/' + customerId +
   '/relatives' + relativeId);
 }

 // Observable
 getRelativeByMail(customerId, email): Observable<Relative> {
  return this.http.get<Relative>('http://localhost:8080/customers/' + customerId +
  '/relativesMail/' + email)
 // .pipe( map( (jsonRelative: any) => jsonRelative.map(jsonR => new Relative2(jsonR))))
  ;
}

// POST : add a new relative to the server */
addRelative(relative: Relative, customerId): Observable<string> {
return this.http.post<string>('http://localhost:8080/customers/' + customerId +
'/relative', relative);
}

// PUT : update a relative to the server
updateRelative(relative: Relative, customerId): Observable<any> {
return this.http.put<Relative>('http://localhost:8080/customers/' + customerId +
'/relatives/' + relative.id, relative);
}

// PUT : update a relative to the server
updateRelativeByMail(relative: Relative, customerId, emailUp: string): Observable<any> {
  return this.http.put<Relative>('http://localhost:8080/customers/' + customerId +
  '/relativesMailU/' + emailUp, relative);
  }

deleteRelativeByMail( customerId, email): Observable<any> {
  return this.http.delete<any>('http://localhost:8080/customers/' + customerId +
  '/relativesMail/' + email);
  }
}
