import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


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
    if(this.auth.login(this.user, this.password)){
      this.router.navigate(["/dashboard"])
    }else{
      this.mensaje = "Usuario o contraseña incorrectos";
    }
  }
}
