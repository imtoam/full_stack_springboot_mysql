import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrlBase: string = "http://localhost:8080/api/users";
  constructor(private http: HttpClient) { }

  // TODO: apis for Admin to manage users
  // getUsers(): Observable<any>{...}
  // getUser(id: any): Observable<any>{...}
  // grantUser(id: any): Observable<any>{...}
  // resetPassword(id: any): Observable<any>{...}
  
}
