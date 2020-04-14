import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { GroupPage, CreateGroupDialog} from './group.page';
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
        path: 'group/:id',
        component: GroupPage,
      }
    ])
  ],
  entryComponents: [CreateGroupDialog],
  declarations: [GroupPage, CreateGroupDialog],
})
export class GroupPageModule {}
