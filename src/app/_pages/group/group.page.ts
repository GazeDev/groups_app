import { Component } from '@angular/core';

import { AuthenticationService } from '_services/index';

import { environment } from '_environment';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
})
export class GroupPage {
  public env: any;

  constructor(
    public authService: AuthenticationService,
  ) {
    this.env = environment;
  }

  async doLogin() {
    await this.authService.login();
  }

}
