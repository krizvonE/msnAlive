import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import { AuthenticationService } from '../authentication.service';
import { User } from 'firebase';
import { ConversationService } from '../conversation.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  id: any;
  user: any;
  friend: any;
  message: string;
  ids = [];
  conversation: any;
  doingZumbido: boolean = false;
  constructor(public activatedRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService, public authenticationService: AuthenticationService,
    public conversationService: ConversationService) {
    // this.userId = this.activateRoute.snapshot.params['userId'];
    // console.log(this.userId);
    // this.userId = parseInt(this.userId);
    // this.friend = this.userService.getUserById(this.userId);
    // console.log(this.friend);
    this.id = activatedRoute.snapshot.params['user_id'];

    this.authenticationService.getStatus().subscribe((response) => {
      console.log(response);

      this.userFirebaseService.getUserById(response.uid).valueChanges().subscribe((result) => {
        this.user = result;
        console.log(this.user);
        this.userFirebaseService.getUserById(this.id).valueChanges().subscribe((result) => {
          this.friend = result;
          console.log(this.friend);
          this.getConversationMessages();

        });
      });
    });
    // const stream = this.userFirebaseService.getUsers();
    // stream.valueChanges().subscribe((result) => {
    //   this.user = result;
    // });
  }
  getConversationMessages() {
    this.ids = [this.friend.user_id, this.user.user_id].sort();
    const stream = this.conversationService.getConversation(this.ids.join('||'));
    stream.valueChanges().subscribe((resultConversation) => {
      this.conversation = resultConversation;
      console.log(this.conversation);
      this.conversation.forEach((message) => { //se itera sobre todos los mensajes
        console.log( "sou", (!message.seen && message.sender != this.user.user_id) );
        if (!message.seen && message.sender != this.user.user_id) { //si no se ha visto
          const promise = this.conversationService.setConversationAttibute(message.uid, message.timestamp, 'seen', true);
          promise.then(() => {
            if (message.type === 'zumbido') {
              this.showZumbido();
            }
            if (message.type === 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            }
          });
          
        }

      });
    });
  }
  sendZumbido() {
    this.ids = [
      this.friend.user_id,
      this.user.user_id
    ].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      type: 'zumbido'
    };
    console.log(messageObject);

    this.conversationService.createConversation(messageObject).then(() => {
      //mensaje enviado
      this.showZumbido();
    });
    this.message = '';
  }
  showZumbido() {
    this.doingZumbido = true;
    window.setTimeout(() => {
      this.doingZumbido = false;
    }, 1000);
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
  }
  sendMessage() {
    //enviar mensaje
    this.ids = [
      this.friend.user_id,
      this.user.user_id
    ].sort();
    const messageObject = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.user_id,
      receiver: this.friend.user_id,
      content: this.message.replace(/\n$/, ''),
      type: 'text'
    };
    console.log(messageObject);

    this.conversationService.createConversation(messageObject).then(() => {
      //mensaje enviado
      const audio = new Audio('assets/sound/new_message.m4a');
      audio.play();
    });
    this.message = '';
  }
  getNickById(id) {
    if (id === this.user.user_id) {
      return this.user.nick;
    } else {
      return this.friend.nick;
    }
  }


  ngOnInit() {
  }


}
