// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/login'; // URL to web api
  private isLoggedInSource = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // Authenticates the user by sending a POST request to the server with email and password.
  authenticate(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { email, password });
  }

  // Sets the user's login state to true.
  login() {
    this.isLoggedInSource.next(true);
  }

  // Sets the user's login state to false and clears any stored user data.
  logout() {
    this.isLoggedInSource.next(false);
  }

  // Returns an observable for the current login state.
  isLoggedIn$() {
    return this.isLoggedInSource.asObservable();
  }
}


