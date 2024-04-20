import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../team';
import { TeamsService } from '../teams.service';


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})

export class TeamsComponent implements OnInit {
  // Holds the list of teams
  teams: Team[] = [];

  constructor(private teamsService: TeamsService) {}

    // Fetch teams from the service
    ngOnInit(): void {
      this.teamsService.getTeams().subscribe(
        (data: Team[]) => {
          this.teams = data.map(team => ({
            ...team,
            logo: `assets/logos/${team.name.replace(/\s+/g, '')}.png`,
            abbreviation: team.name.substring(0, 3).toUpperCase() // Computing the abbreviation
          }));
        },
        error => {
          console.error('There was an error!', error);
        }
      );
  }
}  
