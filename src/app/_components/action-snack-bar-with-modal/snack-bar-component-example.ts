import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef  } from '@angular/material';
import { Router } from '@angular/router';
import { ActionSnackData } from '_models/action-snack';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { Account} from '_models/account.model';
import { ApiService } from '_services/api.service';


@Component({
  selector: 'action-snack-bar-modal',
  templateUrl: './snack-bar-component-example-snack.html',
})
export class SnackBarModalComponent {
  displayName: string;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: ActionSnackData,
    private _snackRef: MatSnackBarRef<SnackBarModalComponent>,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,

  ) {

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
    data: {displayName: this.displayName}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.displayName = result;
  });
}

}


export interface DialogData {
  displayName: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  submit() {
     let account: Account = {};

     account['displayName'] = this.data.displayName;

     this.apiService.getCurrentAccount().subscribe(
       response => {

         this.apiService.patchAccount(response.id, account).subscribe(response2 => {
           console.log(response2);
         });
       },
     );
   }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
