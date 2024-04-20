import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../results.service';
import { Result } from '../result';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {
  results: Result[] = [];
  currentRound = 1;  // Initial round set to 1
  rounds = [1, 2, 3, 4, 5, 6, 7];  // List of rounds for dropdown

  constructor(private resultsService: ResultsService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchResults();  // Fetching results when component initializes
  }

  // Fetching results based on current round
  fetchResults() {
    this.resultsService.getResultsByRound(this.currentRound).subscribe({
      next: (data) => {
        this.results = data.map(result => ({
          ...result,
          team1Logo: `assets/logos/${result.team1.replace(/\s+/g, '')}.png`,  // Generate logo path dynamically
          team2Logo: `assets/logos/${result.team2.replace(/\s+/g, '')}.png`
        }));
      },
      error: (error) => console.error('Error fetching results:', error)
    });
  }

  // Updating a result and handling server response
  updateResult(result: Result) {
    const url = `http://localhost:3000/results/${result.id}`;
    this.http.put(url, result).subscribe({
      next: () => {
        console.log('Update successful');
        alert('Update successful');  // Alert user on success
      },
      error: (error) => {
        console.error('Error updating result:', error);
        alert('Error updating result');  // Alert user on failure
      }
    });
  }
  
  // Deleting a result and updating local data
  deleteResult(id: number) {
    this.http.delete(`http://localhost:3000/results/${id}`).subscribe({
      next: () => {
        this.results = this.results.filter(result => result.id !== id);  // Remove result from local state
        console.log('Delete successful');
        alert('Delete successful');  // Alert user on success
      },
      error: (error) => {
        console.error('Error deleting result:', error);
        alert('Error deleting result');  // Alert user on failure
      }
    });
  }
}

  
