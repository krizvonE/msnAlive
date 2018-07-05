import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  nick: string;
  email: string;
  status: string;
  password: string;
  registeredUid: any;
  constructor(public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  addUser() {
    const user = {
      name:  this.name,
      nick: this.nick,
      // subnick: subnick,
      email: this.email,
      status: this.status,
      // avatar: avatar,
      user_id: this.registeredUid,
      password: this.password
    };
    const promise = this.userFirebaseService.createUser(user);
    this.signUp();
    promise.then(() => {
      alert('Usuario agregado con éxito');
    }).catch((error) => {
      alert('No se pudo agregar el usuario');
      console.log(error);
    });
  }
  signUp() {
    const promise = this.authenticationService.signUp(this.email, this.password);
    promise.then( (data) => {
      this.registeredUid = data.user.uid;
      alert('Registro éxitoso');
      this.addUser();
      console.log(data);
    }).catch((error) => {
      alert('Ocurrio un error');
      console.log(error);
    });
  }
  editUser() {
    const user = {
      name: '',
      nick: '',
      subnick: '',
      email: '',
      status: '',
      avatar: '',
      user_id: ''
    };
    const promise = this.userFirebaseService.createUser(user);
    promise.then(() => {
      alert('Usuario editado con éxito');
    }).catch((error) => {
      alert('No se pudo editar el usuario');
      console.log(error);
    });
  }
}
