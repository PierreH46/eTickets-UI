import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '@app/model/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,
              @Inject('BACKEND_URL') private url: string) { }

  getOneCustomer(customerId: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/customers/${customerId}`)
      .pipe(
        map(
          (jsonCustomer: any) => jsonCustomer.map(jsonC => new Customer(jsonC))
        )
      );
  };
}
