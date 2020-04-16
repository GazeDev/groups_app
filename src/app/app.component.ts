import { Component, Inject } from '@angular/core';
import { environment } from '_environment';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  short_description: string;
  description: string;
}

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
  name: string;
  description: string;

  constructor(
    private apiService: ApiService,
    public authService: AuthenticationService,
    public dialog: MatDialog,
  ) {
    this.initializeApp();
    this.apiService.setUrl(environment.apiURL);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialog, {
      width: '250px',
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.name = result;
    });
  }

  getUserGroups() {
    this.getAccount();
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

@Component({
  selector: 'create-group-dialog',
  templateUrl: 'group.page.dialog.html',
})
export class CreateGroupDialog {

  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup(group): void {
    this.apiService.createGroup(group).subscribe(
      groupResponse => {
        let groupId = groupResponse.body.id;
      },
    )
  }

  submit() {
   let group: Group = {};

   group['title'] = this.data.title;
   group['short_description'] = this.data.short_description;
   group['description'] = this.data.description;

   this.apiService.getAccount().subscribe(
     response => {
       group['AdminId'] = response.id;
       this.createGroup(group);
     },
   );
 }
}
