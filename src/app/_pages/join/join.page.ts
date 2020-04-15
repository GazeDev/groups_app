import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';

@Component({
  selector: 'join-page',
  templateUrl: 'join.page.html',
  styleUrls: ['join.page.scss'],
})
export class JoinPage {
  public joinGroups: Group[] = [];
  public selectedOptions: Group[] = [];
  public userAccount: any;
  constructor(
    private apiService: ApiService,
  ) {

    this.apiService.getGroups().subscribe(res => {
      this.joinGroups = res;
    },
    err => {
      console.log('err', err);
    });
  }

  ngOnInit() {
  }

  onSelection(e, v) {
    console.log(e);
    console.log(v);    
  }

  joinSelectedGroups(e, v) {
    this.getAccount();

    for (var group of this.selectedOptions) {
      console.log(group);

      let accountGroup = {
        "GroupId": group.id,
        "AccountId": this.userAccount
      }
      this.apiService.createAccountGroup(group.id, accountGroup).subscribe(res => {
        console.log("success");
      },
      err => {
        console.log('err', err);
      });
    }
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
    });
    console.log(this.userAccount);
  }
}
