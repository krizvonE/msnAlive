import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public angularFireAuth: AngularFireAuth) { }
  
  emailLogin(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut() {
    return this.angularFireAuth.auth.signOut();
  }

  signUp(email, password) {
     return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.angularFireAuth.authState;
  }
}
