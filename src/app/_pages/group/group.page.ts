import { Component, Inject } from '@angular/core';

import { AuthenticationService } from '_services/index';

import { environment } from '_environment';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
})
export class GroupPage {
  public env: any;
  name: string;
  description: string;

  constructor(
    public dialog: MatDialog,
    public authService: AuthenticationService,
  ) {
    this.env = environment;
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

  async doLogin() {
    await this.authService.login();
  }

}

@Component({
  selector: 'create-group-dialog',
  templateUrl: 'group.page.dialog.html',
})
export class CreateGroupDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
