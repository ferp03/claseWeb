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
  chuckJson: Joke | null = null;
  categories: string[] = ['none'];
  selectedCategory: string = '';

  constructor(private auth: AuthService, private router: Router, private apiService: ApiService){}

  ngOnInit(): void {
    this.fetchCategories();
  }
  
  fetchApi(): void{
    this.apiService.getMensaje().subscribe(
      (response) => {
        this.mensajeApi = response.mensaje;
      },
      (error) => {
        console.error('Error al obtener el mensaje', error);
      }
    );
  };

  fetchChuck(): void{
    console.log(this.selectedCategory);
    this.apiService.fetchChuck(this.selectedCategory).subscribe({
      next: (response) => {
        this.chuckJson = response.joke as Joke;
        console.log(this.chuckJson);
      },
      error: (error) => {
        console.log('Error al buscar chiste', error);
      }
    });
  };

  fetchCategories(): void{
    this.apiService.fetchCategories().subscribe(
      (response) => {
        this.categories = [...this.categories, ...response.categories];
        this.selectedCategory = this.categories[0];
        console.log(this.categories, typeof(this.categories));
      },
      (error) => {
        console.log('Error al obtener categorias', error);
      }
    );
  };
}
