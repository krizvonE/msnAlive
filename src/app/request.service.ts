import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }

  createRequest(request, email) { //enviar solicitud para que se registre y agregar nuevo amigo
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.object('request/' + cleanEmail + '/' + request.sender).set(request);
  }
}
