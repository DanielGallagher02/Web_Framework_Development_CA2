import { Component, OnInit } from '@angular/core';
import { Result } from '../result';
import { ResultsService } from '../results.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent implements OnInit{
  results: Result[] = []; // Holds all results
  filteredResults: Result[] = []; //Holds results filtered by round and team
  currentRound: number = 1; // Tracks the current round displayed
  searchTeamName: string = ''; // Added property for the search term

  constructor(private resultsService: ResultsService) {}

  //fetch results for the initial round when the component loads
  ngOnInit(): void {
    this.getResultsByRound(this.currentRound);
  }

  // Fetches results for a specific round and applies initial filters
  getResultsByRound(round: number): void {
    this.resultsService.getResults().subscribe(
        (data: Result[]) => {
            // Map results to add team logos and set up initial result set
            this.results = data.map(result => ({
                ...result,
                team1Logo: `assets/logos/${result.team1.replace(/\s+/g, '')}.png`,
                team2Logo: `assets/logos/${result.team2.replace(/\s+/g, '')}.png`
            }));
            this.filterResults(this.currentRound, this.searchTeamName);
        },
        error => console.error('Error fetching results', error)
    );
  }

   // Filters results based on the round and team name
  filterResults(round: number, teamName: string): void {
    this.filteredResults = this.results.filter(result =>
      result.round === round.toString() &&
      (result.team1.includes(teamName) || result.team2.includes(teamName))
    );
    console.log('Filtered results:', this.filteredResults); // Debugging
  }

  // Updates the filtered results based on the current search term
  onSearchTeamName(): void {
    this.filterResults(this.currentRound, this.searchTeamName);
  }

  // Increments the round counter and filters results for the next round
  goToNextRound(): void {
    if (this.currentRound < 7) { // Check against the maximum round
      this.currentRound++;
      this.filterResults(this.currentRound, this.searchTeamName);
    }
  }

  // Decrements the round counter and filters results for the previous round
  goToPreviousRound(): void {
    if (this.currentRound > 1) {
      this.currentRound--;
      this.filterResults(this.currentRound, this.searchTeamName);
    }
  }
}