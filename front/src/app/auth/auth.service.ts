import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.estaAutenticado());

  constructor(private router: Router, private api: ApiService, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(user: string, password: string): Observable<boolean>{
    return this.api.login(user, password).pipe(
      map(res =>{
        if(res.success){
          // agregar sesión a object storage con token
          localStorage.setItem('token', 'dummy-token');
          this.authState.next(true); 
          /* 
          Angular no es bueno en trackear el object storage cada que hace cambios,
          por lo que implementamos un Behavior Subject para que lo haga implicitamente
          */
          return true;
        }else{
          return false;
        }
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean{
    if(isPlatformBrowser(this.platformId)){
      return !! localStorage.getItem('token');
    }
    return false;
  }

  authStatus(): Observable<boolean>{
    return this.authState.asObservable();
  }
}
