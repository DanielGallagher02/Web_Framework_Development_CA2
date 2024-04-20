import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { ResultsComponent } from './results/results.component';
import { RoutesComponent } from './routes/routes.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TablesComponent } from './tables/tables.component';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterOutlet, NavbarComponent, PlayersComponent, TeamsComponent, ResultsComponent, 
            RoutesComponent, HttpClientModule, CommonModule, LoginComponent, AdminComponent, TablesComponent, StatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment2';
}
