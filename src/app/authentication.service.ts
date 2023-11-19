import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {    
    return this.http.get(`${environment.apiBaseUrl}/users?email=${email}&password=${password}`);
  }
}
