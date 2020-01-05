import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Eticket } from '../model/eticket';

@Injectable({
  providedIn: 'root'
})
export class EticketService {

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private url: string) { }

  getAllEtickets(): Observable<Eticket[]> {
    return this.http.get<Eticket[]>(`${this.url}/etickets2`)
      .pipe(
        map(
          (jsonEticket: any) => jsonEticket.map(jsonE => new Eticket(jsonE))
          )
      );
  }


}
