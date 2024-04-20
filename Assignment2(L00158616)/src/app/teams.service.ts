import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})

export class TeamsService {  
  private teamsUrl = 'http://localhost:3000/teams';  // URL to web api

  // Inject HttpClient to make HTTP requests
  constructor(private http: HttpClient) { }

  // Retrieves an array of teams from the server.
  getTeams(): Observable<Team[]> {
    // Perform a GET request to obtain an array of Team objects from the specified URL
    return this.http.get<Team[]>(this.teamsUrl);
  }  
  

}
