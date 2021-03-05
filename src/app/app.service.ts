import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  putUser(id, row): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, row);
  }

  postUser(row): Observable<any> {
    return this.http.post(this.baseUrl, row);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
