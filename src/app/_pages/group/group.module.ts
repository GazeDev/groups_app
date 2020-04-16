import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';

import { GroupPage} from './group.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild([
      {
        path: 'group/:id',
        component: GroupPage,
      }
    ])
  ],
  entryComponents: [],
  declarations: [GroupPage],
})
export class GroupPageModule {}
