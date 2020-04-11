import { Component } from '@angular/core';

import { AuthenticationService, ApiService } from '_services/index';

import { environment } from '_environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public env: any;
  public groups: any = [];

  constructor(
    public authService: AuthenticationService,
    public apiService: ApiService,
  ) {
    this.env = environment;
    this.apiService.getGroups().subscribe( res => {
      this.groups = res;
    },
    err => {
      console.log('err', err);
    });
  }

  async doLogin() {
    await this.authService.login();
  }

}
