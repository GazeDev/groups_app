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
  public currentGroups: any = [];

  constructor(
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.getAccount();
  }

  joinSelectedGroups() {
    for (var group of this.selectedOptions) {
      let accountGroup = {
        "GroupId": group.id,
        "AccountId": this.userAccount.id
      }
      this.apiService.createAccountGroup(group.id, accountGroup).subscribe(res => {
        this.getJoinGroups();
        setTimeout(function(){ // Refresh page so joined group shows up on side bar automatically.
          console.log("hello");
          window.location.reload();
        },50); 
      },
      err => {
        console.log('err', err);
      });
    }
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
      this.getJoinGroups();
    });
  }

  getJoinGroups() {
    this.apiService.getGroups().subscribe(res => {
      var allGroups = res;
      // Filter out groups a user is already a part of.
      this.apiService.getAccountGroups(this.userAccount.id).subscribe(res => {
        this.currentGroups = res;

        // Remove from join Groups
        this.joinGroups = allGroups.filter(x => !this.currentGroups.map(g => g.GroupId).includes(x.id));
      },
      err => {
        console.log('err', err);
      });
    },
    err => {
      console.log('err', err);
    });
  }
}
