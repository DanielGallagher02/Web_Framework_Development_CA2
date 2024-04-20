import { Team } from "./team";

export interface Player {
    id: string;
    teamID: number; 
    name: string;
    squadNumber: number;
    age: number;
    matches: number;
    team?: Team;
}

//Players Table 
/*
id: '1001', '1002', '1003'
teamID: '1', '2', '3', '4', '5', 
name: 'Micheal Byrne', 'Ronan Hanna', 'Luke Mulholland'
squadNumber: 1 , 2 , 3 , 4 , 5 , 6 , 
age: 22, 32, 33
matches: 6, 59, 44

*/

