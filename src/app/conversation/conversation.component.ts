import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  users: any;
  friend = {};
  constructor(public activateRoute: ActivatedRoute, public userFirebaseService: UserFirebaseService) { 
    // this.userId = this.activateRoute.snapshot.params['userId'];
    // console.log(this.userId);
    // this.userId = parseInt(this.userId);
    // this.friend = this.userService.getUserById(this.userId);
    // console.log(this.friend);
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe((result) => {
      this.users = result;
    });
  }

  ngOnInit() {
  }

}
