import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef  } from '@angular/material';
import { Router } from '@angular/router';
import { ActionSnackData } from '_models/action-snack';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { Account } from '_models/group.account';


@Component({
  selector: 'action-snack-bar-modal',
  templateUrl: './snack-bar-component-example-snack.html',
})
export class SnackBarModalComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ActionSnackData,
    private _snackRef: MatSnackBarRef<SnackBarModalComponent>,
    private router: Router,
    public dialog: MatDialog,
  ) {
    console.log('data', this.data);

    let actionData = new ActionSnackData();
    console.log('actionData', actionData);
    this.data = {...actionData, ...this.data};

    console.log('data', this.data);
  }

  action() {
    if (this.data.action.navigateTo) {
      this.router.navigate([this.data.action.navigateTo]);
    }
    this._snackRef.dismissWithAction();
  }

  dismiss() {
    this._snackRef.dismiss();
  }

  openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '250px',
    data: {name: this.name, animal: this.animal}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}

}


export interface DialogData {
  username: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  submit() {
     let account: Account = {};

     account['username'] = this.data.username;

     this.apiService.getAccount().subscribe(
       response => {
         account['id'] = response.id;
         console.log(this.patchAccount(account['id'], account));
       },
     );
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
