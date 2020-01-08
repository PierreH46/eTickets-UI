import { Injectable, Inject } from '@angular/core';
import { Relative } from '../model/relative';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
// getRelative(customerId, relativeId): Observable<Relative> {
//   return this.http.get<Relative>('http://localhost:8080/customers/' + customerId + '/relatives');
// }

// getAllRelativesDBJson(): Observable<Relative[]> {
//  return this.http.get<Relative[]>(`${this.url}/relatives`)
//    .pipe(
//      map((jsonRelative: any) => jsonRelative.map(jsonRelative => new Relative(jsonRelative)))
//    );
// }

// getRelativeDBJson(id): Observable<Relative> {
//  return this.http.get<Relative>(`${this.url}/relative`)
//    .pipe(
//      map((jsonRelative: any) => jsonRelative.map(jsonRelative => new Relative(jsonRelative)))
//    );//
//}

// POST : add a new relative to the server */
addRelative(relative: Relative, customerId): Observable<string> {
return this.http.post<string>('http://localhost:8080/customers/' + customerId +
'/relative', relative);
}

// POST : update a relative to the server
updateRelative(relative: Relative, customerId): Observable<any> {
return this.http.put<Relative>('http://localhost:8080/customers/' + customerId +
'/relatives/' + relative.id, relative);
}
}
