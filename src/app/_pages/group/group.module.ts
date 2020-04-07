import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { GroupPage, CreateGroupDialog, CreatePostForm } from './group.page';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: 'group',
        component: GroupPage,
      }
    ])
  ],
  entryComponents: [CreateGroupDialog, CreatePostForm],
  declarations: [GroupPage, CreateGroupDialog, CreatePostForm],
})
export class GroupPageModule {}
