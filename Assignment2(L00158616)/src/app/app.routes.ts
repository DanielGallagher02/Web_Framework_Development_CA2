import { Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { ResultsComponent } from './results/results.component';
import { RoutesComponent } from './routes/routes.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StatsComponent } from './stats/stats.component';
import { TablesComponent } from './tables/tables.component';

export const routes: Routes = [
    {path: '', component: RoutesComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'players', component: PlayersComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'routes', component: RoutesComponent},
    {path: 'stats', component: StatsComponent},
    {path: 'tables', component: TablesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: AdminComponent}
];
