import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todos';
  roles: string[] = [];
  isLoggedIn = false;
  showAdminLink = false;
  showAddLink = false;
  showEditLink = false;
  username: string = "";

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminLink = this.roles.includes('ROLE_ADMIN');
      this.showAddLink = this.roles.includes('ROLE_CREATE');
      this.showEditLink = this.roles.includes('ROLE_EDIT');

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
