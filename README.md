Web_Framework_Development_CA2: GAA NFL Project
Instructor: Thomas D. Devine
Submission Deadline: April 2024
Introduction
This repository is designated for the second course assignment of the Web Framework Development module for the academic year 2023/24. The project focuses on creating a full-stack web application using Angular for the frontend and Express for the backend, centered around a REST API and dynamic content management.

Part 1: REST API Database Server
Requirements
JSON Data Routes (42 marks, 13%)
Implement the following API routes in Express, which serve data retrieved via SQL queries from a database:
GET /teams: Returns all teams in JSON format.
GET /players: Returns all players in JSON format.
GET /results: Returns all results in JSON format.
GET /results/by-round: Returns results filtered by rounds in JSON format.
Ensure data retrieval is managed through Angular Services.
Part 2: Angular Website
General Components
Navigation Bar (15 marks, 5%)
Implement a consistent navigation bar across all pages using Angular routing.
Style the navigation bar using Bootstrap.
Specific Components
Teams (28 marks, 8%)
Display team data in a table sorted by team name.
Fetch data via the REST API.
Include links to each team's Wikipedia page.
Utilize an Angular interface for handling team data requests.
Players (25 marks, 7%)
Display players ordered by team and name.
Implement a dropdown to select teams, populated from the database.
Enable player filtering based on team selection.
Results (47 marks, 14%)
Display results for "Round 1" by default with options to navigate between rounds.
Implement round-based and team-based filtering for results.
Tables (35 marks, 10%)
Construct league tables using JavaScript to process results and/or team data.
Display rankings based on division, wins, draws, losses, goal difference, and points.
Stats (60 marks, 18%)
Create charts for team match scores and form using either SVG or D3.js.
Ensure chart accuracy in titles, labels, scores, and match outcomes visualization.
Login and Admin Features (64 marks, 19%)
Implement a functional login form with credential validation.
Ensure that navigation updates correctly upon login/logout.
Provide administrative capabilities for editing and updating match results.
Miscellaneous
Console (20 marks, 6%)
Ensure no warnings or errors are present in the browser console tab.
Code Review
Submissions will undergo a code review assessing:

Readability
Code duplication
Variable naming
Performance
Authenticity
Avoidance of hard coding
