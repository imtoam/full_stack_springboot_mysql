import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { Todo } from '../models/todo.model';

const httpHeaderOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  todoUrlBase: string = "http://localhost:8080/api/todos";
  constructor(private http: HttpClient) { }
  
  getAll():Observable<Todo[]>
  {
    return this.http.get<Todo[]>(this.todoUrlBase+`/all`, httpHeaderOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

  getByStatus(status: string):Observable<Todo[]>
  {
    let httpParamOptions = new HttpParams().set('status',status);
    const httpOptions = {params: httpParamOptions, headers: httpHeaderOptions.headers};
    return this.http.get<Todo[]>(this.todoUrlBase, httpOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

  get(id: any):Observable<Todo>
  {
    return this.http.get<Todo>(this.todoUrlBase+`/`+id, httpHeaderOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

  delete(id: any):Observable<string>
  {
    //console.log("http handling delete...")
    return this.http.delete<string>(this.todoUrlBase+`/`+id, httpHeaderOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

  update(todo: Todo):Observable<Todo>
  {
    return this.http.put<Todo>(this.todoUrlBase+`/`+todo.id, todo, httpHeaderOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

  add(todo: Todo):Observable<Todo>
  {
    return this.http.post<Todo>(this.todoUrlBase+`/add`, todo, httpHeaderOptions)
      .pipe( catchError( (err)=>{
        console.log('error caught in service')
        console.error(err);
        return throwError(err);
      })
      );
  }

}
