import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../components/employee';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiServer = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiServer+'/employees/')
  }

  getEmployeeById(employeeId: string): Observable<Employee>{
    return this.http.get<Employee>(this.apiServer + '/employees/' + employeeId)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.apiServer+ '/employees', JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  updateEmployee(employee: Employee): Observable<number>{
    return this.http.put<number>(this.apiServer+'/employees/'+ employee.id, employee, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  deleteEmployee(employeeId: string): Observable<number>{
    return this.http.delete<number>(this.apiServer+'/employees/'+ employeeId, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
