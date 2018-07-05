import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(public angularFireDatabase: AngularFireDatabase) { }

  createConversation(conversation) {
    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation); 
  }
  
  getConversation(uid) {
    return this.angularFireDatabase.list('conversations/' + uid);
  }
  setConversationAttibute(conversationId, messageTimestamp, attribute, value) {
    return this.angularFireDatabase.object('conversations/' + conversationId + '/' + messageTimestamp + 
    '/' + attribute).set(value);
  }
}
