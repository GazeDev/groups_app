import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

import { JoinPage } from './join.page';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatGridListModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: 'join',
        component: JoinPage,
      }
    ])
  ],
  declarations: [JoinPage],
})
export class JoinPageModule {}
