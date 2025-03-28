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
  username = '';
  password = '';
  password2 = '';
  mensaje = '';
  email = '';
  isSignUp = false;
  showForgot = false;
  isForgot = false;
  errorCount = 0;

  constructor(private auth: AuthService, private router: Router, private api: ApiService) {}

  login(): void {
    this.auth.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.errorCount = 0;
          this.router.navigate(['/dashboard']);
        } else if (this.errorCount >= 2) {
          this.showForgot = true;
        } else {
          this.mensaje = response.error;
          console.log(this.mensaje);
          this.errorCount++;
        }
      },
      error: (err) => {
        // Este bloque se activa si el backend devuelve 401 u otro error de red
        this.mensaje = err.error?.error || 'Hubo un error al intentar iniciar sesión';
        console.log(this.mensaje);
      }
    });
  }

  signup(): void {
    if (!this.username || !this.password || !this.email) {
      this.mensaje = 'Debes ingresar usuario, correo y contraseña.';
      return;
    }else if(this.password !== this.password2){
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }

    this.api.signup(this.username, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log(response)
        if(response.success){
          // this.mensaje = response.error;
          // console.log(this.mensaje);
          this.login();
        }else{
          this.mensaje = response.error;
          console.log(this.mensaje);
        }
      }, error: (err) => {
        this.mensaje = err.error?.error || 'Hubo un error al intentar iniciar sesión';
        console.log(this.mensaje);
      }
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
