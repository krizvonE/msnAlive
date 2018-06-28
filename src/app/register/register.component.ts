import { Component, OnInit } from '@angular/core';
import { UserFirebaseService } from '../user-firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(public userFirebaseService: UserFirebaseService) { }

  ngOnInit() {
  }

  addUser(name, nick, subnick, email, status, avatar) {
    const user = {
      name:  name,
      nick: nick,
      subnick: subnick,
      email: email,
      status: status,
      avatar: avatar,
      user_id: Date.now()
    };
    const promise = this.userFirebaseService.createUser(user); 
    promise.then(() => {
      alert('Usuario agregado con éxito');
    }).catch((error) => {
      alert('No se pudo agregar el usuario');
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
