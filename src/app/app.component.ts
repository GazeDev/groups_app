import { Component } from '@angular/core';
import { environment } from '_environment';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public env: any = environment;
  public userAccountGroups: any = [];
  public userGroups: Group[] = [];
  public userAccount: any;

  constructor(
    private apiService: ApiService,
    public authService: AuthenticationService,
  ) {
    this.initializeApp();
    this.apiService.setUrl(environment.apiURL);
    this.getAccount();
    this.getUserGroups();
  }

  async initializeApp() {
    await this.authService.init();
  }

  async doLogin() {
    await this.authService.login();
  }

  async doLogout() {
    await this.authService.logout();
  }

  async accountManagement() {
    await this.authService.account();
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
    });
  }

  getUserGroups() {
    this.apiService.getGroups().subscribe(res => {
      this.apiService.getAccountGroups(this.userAccount.id).subscribe(res => {
        this.userAccountGroups = res;
        for (var group of this.userAccountGroups) {
          console.log("group:");
          console.log(group);
          this.apiService.getGroup(group.GroupId).subscribe(res => {
            this.userGroups.push(res);
          },
          err => {
            console.log(err);
          })
        }
      },
      err => {
        console.log('err', err);
      });
    });
  }
}
