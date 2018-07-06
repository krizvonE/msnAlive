import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { UserFirebaseService } from '../user-firebase.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../request.service';
import { AuthenticationService } from '../authentication.service';


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
  shouldAdd: string = 'yes';
  @ViewChild('friendRequest') friendRequestModal;
  requests = [];
  currentRequest: any;
  userObject: any;
  constructor(public userService: UserService, public userFirebaseService: UserFirebaseService, private modalService: NgbModal, 
  public requestService: RequestService, public authenticationService: AuthenticationService) { 
    const stream = this.userFirebaseService.getUsers();
    stream.valueChanges().subscribe((result) => {
      this.users = result;
    });
    const stream2 = this.authenticationService.getStatus();
    stream2.subscribe((result) => {
      this.user = result;
      this.userFirebaseService.getUserById(this.user.uid).valueChanges().subscribe((result2) => {
        this.userObject = result2;
        this.userObject.friends = Object.values(this.userObject.friends);
        console.log(this.userObject);
      });

      this.getRequestsForEmail();
    });
    console.log(this.users);
  }
  getRequestsForEmail() {
    const stream = this.requestService.getRequestsForEmail(this.user.email);
    stream.valueChanges().subscribe((requests) => {
      this.requests = requests;
      this.requests = this.requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        this.currentRequest = r;
        this.openModal();
      });
      console.log(this.requests);
      
    });
  }
  openModal() {
    this.modalService.open(this.friendRequestModal);
  }
  accept() {
    if(this.shouldAdd === 'yes') {
      this.requestService.setRequestStatus(this.currentRequest, 'accepted').then(() => {
        this.userFirebaseService.addFriend(this.user.uid, this.currentRequest.sender);
        alert('Si aceptó');
      });
    } else {
      this.requestService.setRequestStatus(this.currentRequest, 'rejected');
      alert('No aceptó');
    }
  }
  decideLater() {
    this.requestService.setRequestStatus(this.currentRequest, 'decide_later');
    alert('Decidiremos luego')
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
