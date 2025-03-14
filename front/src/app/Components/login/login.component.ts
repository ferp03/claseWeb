import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = '';
  password = '';
  password2 = '';
  mensaje = '';
  email = '';
  isSignUp = false;
  showForgot = false;
  isForgot = false;
  errorCount = 0;

  constructor(private auth: AuthService, private router: Router, private api: ApiService) {}

  login(): void{
    this.auth.login(this.user, this.password).subscribe(success => {
      if(success){
        this.errorCount = 0;
        this.router.navigate(['/dashboard']);
      }else if(this.errorCount>=2){
        this.showForgot = true;
      }else{
        this.mensaje = 'Usuario o contraseña incorrectos';
        this.errorCount++;
      }
    })
  }

  signup(): void {
    if (!this.user || !this.password) {
      this.mensaje = 'Debes ingresar usuario y contraseña.';
      return;
    }else if(this.password !== this.password2){
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }
    this.api.signup(this.user, this.password).subscribe(response => {
      if(response.success){
        this.mensaje = response.message;
        this.login();
      }else{
        this.mensaje = response.message
      }
    }, error => {
      this.mensaje = 'Hubo un error en el servidor, intente de nuevo';
    });
  }

  recover(): void{
    alert(`Password sent to ${this.email}`)
    this.email = '';
    this.isSignUp = false;
    this.showForgot = false;
    this.isForgot = false;
  }

  guest(): void{
    this.router.navigate(['/about']);
  }
}
