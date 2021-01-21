import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { EmpLogin } from './components/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud';

  user: EmpLogin;

  constructor(
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.user.subscribe(usr => this.user = usr);
  }

  logout() {
      this.authenticationService.logout();
  }
}
