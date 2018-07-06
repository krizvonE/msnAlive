import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserFirebaseService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }

  getUsers() {
    return this.angularFireDatabase.list('users');
  }
  createUser(user) {
    return this.angularFireDatabase.object('users/' + user.user_id).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object('users/' + user.user_id).set(user);
  }
  getUserById(user) {
    return this.angularFireDatabase.object('users/' + user);

  }
  addFriend(user_id, friend_id) {
    this.angularFireDatabase.object('users/' + user_id + '/friends/' + friend_id).set(friend_id);
    return this.angularFireDatabase.object('users/' + friend_id + '/friends/' + user_id).set(user_id);
  }
}
