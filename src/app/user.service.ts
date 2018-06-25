import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {nick: '1 Mi nick', subNick: 'Mi subNick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email',
  userId: 1},
    {nick: '2 Mi nick', subNick: 'Mi subNick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email',
  userId: 2},
    {nick: '3 Mi nick', subNick: 'Mi subNick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email',
  userId: 3},
    {nick: '4 Mi nick', subNick: 'Mi subNick', avatar: 'avatar.jpg', status: 'online', email: 'mi@email',
  userId: 4},
  ]
  constructor() { }

  getUsers() {
    return this.users;
  }

  getUserById(userId) {
    let user = {};
    user = this.users.filter( (u) => {
      return u.userId === userId;
    })[0];
    return user; 
  }
}
