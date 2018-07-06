import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }

  createRequest(request, email) { //enviar solicitud para que se registre y agregar nuevo amigo
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request);
  }
  getRequestsForEmail(email) {  
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list('requests/' + cleanEmail);
  }
  setRequestStatus(request, status) {
    const cleanEmail = request.receiver.replace('.', ',');
    return this.angularFireDatabase.object( 'requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
  }
}
