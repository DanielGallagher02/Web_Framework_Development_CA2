import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { Team } from '../team';
import { TeamsService } from '../teams.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})

export class PlayersComponent implements OnInit{
  // Array to hold team data, players and filtered players based on team selection
  players: (Player & { team?: Team })[] = [];
  teams: Team[] = [];
  filteredPlayers: (Player & { team?: Team })[] = [];

  constructor(private playersService: PlayersService, private teamsService: TeamsService) {}


  ngOnInit(): void {
    // Simultaneous retrieval of players and teams data using RxJS forkJoin
    forkJoin({
      // Fetch players data from the service
      players: this.playersService.getPlayers(),
      // Fetch teams data from the service and enhance each team object
      teams: this.teamsService.getTeams().pipe(
        map(teams => teams.map(team => ({
          ...team,
          logo: `assets/logos/${team.name.replace(/\s+/g, '')}.png`
        })))
      )
    }).subscribe({
      next: ({ players, teams }) => {
        const teamsMap = new Map<number, Team>();
        // Create a map of teams by their ID for quick lookup
        teams.forEach(team => teamsMap.set(team.id, team));

        this.teams = teams;
        // Map players to their corresponding team object
        this.players = players.map(player => ({
          ...player,
          team: teamsMap.get(player.teamID)
        })).sort((a, b) => {
          // Sorting players first by their team name, then by player name
          const teamAName = a.team?.name || '';
          const teamBName = b.team?.name || '';
          return teamAName.localeCompare(teamBName) || a.name.localeCompare(b.name);
        });

        this.filteredPlayers = [...this.players]; // Set filteredPlayers to all players initially
      },
      error: error => console.error('Error fetching data:', error)
    });
  }

  // Filtering players based on selected team
  onTeamSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const teamId = selectElement.value;
    this.filteredPlayers = teamId === 'all'
      ? [...this.players] // Showing all players when 'All' is selected
      : this.players.filter(player => player.team?.id.toString() === teamId); // Filter by selected team
  }
}