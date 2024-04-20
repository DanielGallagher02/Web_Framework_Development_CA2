import { Injectable } from '@angular/core';
import { Player } from './player';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersUrl = 'http://localhost:3000/players';

  // Injecting HttpClient to make HTTP requests
  constructor(private http: HttpClient) { }

  // Fetches an array of Player objects from the server.
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }

  
}
