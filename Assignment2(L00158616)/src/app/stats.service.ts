import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StatsService {
  private statsUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getTeamScores(team: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.statsUrl}/scores/${team}`);
  }
}
