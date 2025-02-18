import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unsecured-page',
  templateUrl: './unsecured-page.component.html',
  styleUrls: ['./unsecured-page.component.css']
})
export class UnsecuredPageComponent {
  constructor(private router: Router) {}

  backToLogin(): void{
    this.router.navigate(["/login"])
  }
}
