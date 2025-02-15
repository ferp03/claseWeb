import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario = {user: "admin", password: "password"};
  private isLoggedIn = false;
  constructor(private router: Router) { }

  login(user: string, pass: string): boolean{
    if(user === this.usuario.user && pass === this.usuario.password){
      this.isLoggedIn = true;
      return true;
    }else{
      return false;
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return this.isLoggedIn;
  }
}
