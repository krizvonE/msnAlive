import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public authenticationService: AuthenticationService) {}
  logOut() {
    // Cerrar sesión
    this.authenticationService.logOut();
  }
}
