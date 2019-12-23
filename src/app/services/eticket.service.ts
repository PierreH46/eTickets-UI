import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eticket } from '../model/eticket';

@Injectable({
  providedIn: 'root'
})
export class EticketService {

  constructor(private http: HttpClient) { }

  getAllEtickets(): Observable<Eticket[]> {
    return this.http.get<Eticket[]>('http://localhost:8080/etickets');
  }


}
