import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../envs/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMensaje(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mensaje`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {username, password});
  }

  fetchChuck(category: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chuckNorris`, {category});
  }

  fetchCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }
}