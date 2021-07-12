import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

const AUTH_URL_BASE = 'http://localhost:8080/api/auth';

const httpHeaderOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_URL_BASE + '/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpHeaderOptions)
    .pipe( catchError( (err)=>{
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(AUTH_URL_BASE + '/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpHeaderOptions)
    .pipe( catchError( (err)=>{
      console.log('error caught in service')
      console.error(err);
      return throwError(err);
    })
    );
  }
}