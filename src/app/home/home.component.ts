import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  constructor(public userService: UserService, public userFirebaseService: UserFirebaseService) { 
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe((result) => {
      this.users = result;
    });

    console.log(this.users);
  }

  ngOnInit() {
  }

}
