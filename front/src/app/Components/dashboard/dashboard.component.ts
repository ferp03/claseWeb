import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/services/api.service';

interface Joke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {  
  mensajeApi = "";
  chuckJson: Joke[] | null = null;
  categories: string[] = ['none'];
  selectedCategory: string = this.categories[0];

  constructor(private auth: AuthService, private apiService: ApiService){}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchChuck();
  }

  fetchChuck(): void {
    this.apiService.fetchChuck(this.selectedCategory, 10)
      .toPromise()
      .then(response => {
        this.chuckJson = response.jokes as Joke[];
        console.log(this.chuckJson);
      })
      .catch(error => {
        console.log('Error al buscar chiste', error);
      });
  }

  fetchCategories(): void {
    this.apiService.fetchCategories()
      .toPromise()
      .then(response => {
        this.categories = [...this.categories, ...response.categories];
        console.log(this.categories, typeof(this.categories));
      })
      .catch(error => {
        console.log('Error al obtener categorías', error);
      });
  }

}
