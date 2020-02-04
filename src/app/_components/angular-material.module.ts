import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
} from '@angular/material';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ActionSnackBarComponent } from './action-snack-bar/action-snack-bar';

@NgModule({
  declarations: [
    ActionSnackBarComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    CommonModule,
    RouterModule.forChild([

    ])
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    ActionSnackBarComponent,
  ],
})
export class AngularMaterialModule {}
