import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: string = 'http://localhost:8080/clients';

  constructor(private http: HttpClient) {}


  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientByName(name: string): Observable<Client[]> {
    const url = `${this.apiUrl}?name=${name}`;
    return this.http.get<Client[]>(url);
  }

  getClientByEmail(email: string): Observable<Client[]> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<Client[]>(url);
  }

  save(client: Client): Observable<Client>{
    return this.http.post<Client>(this.apiUrl, client);
  }

  delete(cliente: Client): Observable<void>{
    let url = `${this.apiUrl}/${cliente.id}`;
    return this.http.delete<void>(url);
  }
  
}
