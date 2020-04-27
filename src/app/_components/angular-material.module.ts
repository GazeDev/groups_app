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

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostCardComponent } from './post-card/post-card';
import { CommentCardComponent } from './comment-card/comment-card';

@NgModule({
  declarations: [
    ActionSnackBarComponent,
    PostCardComponent,
    CommentCardComponent,
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'comment-card',
        component: CommentCardComponent,
      },
      {
        path: 'post-card',
        component: PostCardComponent,
      },
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
    PostCardComponent,
    CommentCardComponent,
  ],
})
export class AngularMaterialModule {}
