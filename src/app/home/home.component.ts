import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../request.service';
import { AuthenticationService } from '../authentication.service';
import { resource } from 'selenium-webdriver/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;
  query: string;
  requestEmail: string;
  user: any;
  constructor(public userService: UserService, public userFirebaseService: UserFirebaseService, private modalService: NgbModal, 
  public requestService: RequestService, public authenticationService: AuthenticationService) { 
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe((result) => {
      this.users = result;
    });
    const stream2 = this.authenticationService.getStatus();
    stream2.subscribe((result) => {
      this.user = result;
    });
    console.log(this.users);
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver: this.requestEmail,
      status: 'pending', 
      sender: this.user.uid //id
    };
    this.requestService.createRequest(request, this.requestEmail).then(() => {
      alert('Solicitud Enviada');
    });
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
      
    });
  }
  ngOnInit() {
  }

}
