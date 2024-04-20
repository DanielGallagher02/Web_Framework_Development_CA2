import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Result } from './result';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private resultsUrl = 'http://localhost:3000/results'

  constructor(private http: HttpClient) { }

  getResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.resultsUrl);
  }

  getResultsByRound(round: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.resultsUrl}/${round}`).pipe(
      catchError(error => {
        console.error('Error fetching results:', error);
        return throwError(() => new Error('Error fetching results'));
      })
    );
  }

  updateResult(result: Result) {
    return this.http.put(`${this.resultsUrl}/${result.id}`, result);
  }
  
  deleteResult(resultId: number) {
    return this.http.delete(`${this.resultsUrl}/${resultId}`);
  }
}
