export interface Result {
    id: number;
    round: string;
    division: string;
    team1: string;
    team1ID: string;
    team2: string;
    team2ID: string;
    team1Score: string;
    team1Goals: number;
    team1Points: number;
    team2Score: string;
    team2Goals: number;
    team2Points: number;
    date: string;
    time: string;
    competition: string;
    season: string;
    team1Logo?: string; 
    team2Logo?: string; 
  }
  