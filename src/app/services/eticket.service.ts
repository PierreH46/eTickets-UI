import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Eticket } from '../model/eticket';
import { TypePrice } from '@app/model/basket';

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
// POST : update a relative to the server
//updateStockEticket(quantity: number, eticketId, typePrice: TypePrice): Observable<any> {
//  return this.http.put<Eticket>('http://localhost:8080/etickets/' + eticketId + '/rates/' + typePrice + '/stock/' + quantity,ete);
//  }
}
