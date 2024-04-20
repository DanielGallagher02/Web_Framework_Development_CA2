import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {
  jsonData: any;

  constructor(private http: HttpClient) {}

  getData(url: string) {
    this.http.get(url).subscribe(
      data => {
        this.jsonData = data;
      },
      err => {
        console.error(err);
        this.jsonData = { error: 'Failed to load data.' };
      }
    );
  }

}
