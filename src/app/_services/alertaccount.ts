import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarModalComponent } from '_components/action-snack-bar-with-modal/snack-bar-component-example';

@Injectable()
export class AlertAccount {

    constructor(
      private snackBar: MatSnackBar,
    ) {

    }

    action() {
      this.snackBar.openFromComponent(SnackBarModalComponent, {});
    }

    success() {

    }

    error(message: string) {
      
    }

}
