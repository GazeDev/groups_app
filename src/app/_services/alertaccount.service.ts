import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountSnackBarModal } from '_components/account-snackbar/accountsnackbar';

@Injectable()
export class AlertAccount {

    constructor(
      private snackBar: MatSnackBar,
    ) {

    }

    action() {
      this.snackBar.openFromComponent(AccountSnackBarModal, {});
    }

    success() {

    }

    error(message: string) {

    }

}
