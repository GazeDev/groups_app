import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { GroupPage, CreateGroupDialog } from './group.page';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: 'group',
        component: GroupPage,
      }
    ])
  ],
  entryComponents: [CreateGroupDialog],
  declarations: [GroupPage, CreateGroupDialog]
})
export class GroupPageModule {}
