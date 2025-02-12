import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mensaje: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("ejecutando");
    this.apiService.getMensaje().subscribe(
      (response) => {
        this.mensaje = response.mensaje;
      },
      (error) => {
        console.error('Error al obtener el mensaje', error);
      }
    );
  }
}