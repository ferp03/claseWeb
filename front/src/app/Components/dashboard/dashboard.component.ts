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

  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.fetchCategories();
    this.fetchChuck();
  }

  fetchChuck(): void {
    this.apiService.fetchChuck(this.selectedCategory, 30)
      .toPromise()
      .then(response => {
        this.chuckJson = response.jokes as Joke[];
        this.currentPage  = 1;
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

  get totalPages(): number {
    return this.chuckJson ? Math.ceil(this.chuckJson.length / this.itemsPerPage) : 1;
  }

  get paginatedJokes(): Joke[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.chuckJson ? this.chuckJson.slice(startIndex, startIndex + this.itemsPerPage) : [];
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
