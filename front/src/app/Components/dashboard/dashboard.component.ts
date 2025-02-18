import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private auth: AuthService, private router: Router, private apiService: ApiService){}
  mensajeApi = "";

  logout(): void{
    this.auth.logout()
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
  }
}
