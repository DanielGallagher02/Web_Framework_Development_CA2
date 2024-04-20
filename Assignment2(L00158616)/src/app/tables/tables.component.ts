import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablesService } from '../tables.service';
import { Result } from '../result';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  results: Result[] = [];
  standings: any[] = []; // Holds the standings data for Division 1

  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    // Fetch results on component initialization
    this.tablesService.getResults().subscribe(
      (response: Result[]) => {
        // Filter results for Division 1 excluding games without scores
        this.results = response.filter(result => 
          result.division === '1' && 
          !(result.team1Goals === 0 && result.team2Goals === 0 && result.team1Points === 0 && result.team2Points === 0)
        );
        this.calculateStandings(); // Calculate standings based on filtered results
      },
      error => console.error('Error fetching results:', error)
    );
  }

  calculateStandings(): void {
    const teamsMap = new Map<string, any>();
    // Aggregate results and calculate standings
    this.results.forEach(result => {
      const team1Key = result.team1;
      const team2Key = result.team2;
      if (!teamsMap.has(team1Key)) {
        // Initialize team data if not already present
        teamsMap.set(team1Key, { team: team1Key, played: 0, wins: 0, draws: 0, losses: 0, scoresFor: 0, scoresAgainst: 0, points: 0, diff: 0 });
      }
      if (!teamsMap.has(team2Key)) {
        teamsMap.set(team2Key, { team: team2Key, played: 0, wins: 0, draws: 0, losses: 0, scoresFor: 0, scoresAgainst: 0, points: 0, diff: 0 });
      }

      // Update team statistics
      const team1 = teamsMap.get(team1Key);
      const team2 = teamsMap.get(team2Key);
      team1.played++; team2.played++;
      const team1Score = result.team1Goals * 3 + result.team1Points; // Calculate total points for team 1
      const team2Score = result.team2Goals * 3 + result.team2Points; // Calculate total points for team 2
      team1.scoresFor += team1Score; team1.scoresAgainst += team2Score;
      team2.scoresFor += team2Score; team2.scoresAgainst += team1Score;

      // Determine match result and update standings
      if (team1Score > team2Score) {
        team1.wins++; team1.points += 2; team2.losses++;
      } else if (team2Score > team1Score) {
        team2.wins++; team2.points += 2; team1.losses++;
      } else {
        team1.draws++; team1.points += 1; team2.draws++; team2.points += 1;
      }
    });

    // Convert map to array and sort by points and goal difference
    this.standings = Array.from(teamsMap.values());
    this.standings.sort((a, b) => b.points - a.points || b.diff - a.diff);
    // Assign positions based on sorted standings
    this.standings.forEach((team, index) => { team.position = index + 1; });
  }
}
