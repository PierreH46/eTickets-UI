import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Customer } from '@app/model/customer';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'}
)
      };

    baseUrl = 'http://localhost:8080/customers';
    private currentUserSubject: BehaviorSubject<Customer>;
    public currentUser: Observable<Customer>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Customer>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Customer {
        return this.currentUserSubject.value;

    }

    login(username: string, password: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}/customer/email/${username}`)//, this.httpOptions)

            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}