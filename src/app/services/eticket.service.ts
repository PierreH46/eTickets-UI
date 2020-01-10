import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Eticket } from '../model/eticket';
import { TypePrice } from '@app/model/basket';
import { Rate } from '@app/model/rate';

@Injectable({
  providedIn: 'root'
})
export class EticketService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

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
  getETicket(eticketId): Observable<Eticket> {
    return this.http.get<Eticket>(`${this.url}/etickets2/'${eticketId}`)
    .pipe(
      map(
        (jsonEticket: any) => jsonEticket.map(jsonT => new Eticket(jsonT))
      )
    );
  }
  getRateFromETicket(eticketId): Observable<Rate[]> {
    return this.http.get<Rate[]>('http://localhost:8080/etickets/' + eticketId + '/rates')
    .pipe(
      map(
        (jsonRate: any) => jsonRate.map(jsonR => new Rate(jsonR))
      )
    );
  }
 // POST : update a stock to the serv>er
 updateStockEticket(rate, eticketId,typePrice): Observable<any> {
  return this.http.put<Rate>('http://localhost:8080//etickets/' + eticketId + '/rates/' + typePrice, rate, this.httpOptions);
  }
}
