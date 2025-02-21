import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = "";
  password = "";
  mensaje = "";

  constructor(private auth: AuthService, private router: Router) {}

  login(): void{
    this.auth.login(this.user, this.password).subscribe(success => {
      if(success){
        this.router.navigate(["/dashboard"]);
      }else{
        this.mensaje = "Usuario o contraseña incorrectos";
      }
    })
  }

  guest(): void{
    this.router.navigate(["/about"]);
  }
}
