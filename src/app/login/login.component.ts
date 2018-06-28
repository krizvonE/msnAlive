import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  registeredUid: any;
  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  logIn() {
    const promise = this.authenticationService.emailLogin(this.email, this.password);
    promise.then( (data) => {
      alert('Login éxitoso');
      console.log(data);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }

}
