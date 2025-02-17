import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  constructor(private router: Router, private api: ApiService) { }

  login(user: string, password: string): Observable<boolean>{
    return this.api.login(user, password).pipe(
      map(res =>{
        if(res.success){
          this.isLoggedIn = true;
          return true;
        }else{
          return false;
        }
      })
    )
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return this.isLoggedIn;
  }
}
