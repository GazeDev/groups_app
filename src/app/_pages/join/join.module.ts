import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '_components/angular-material.module';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import { JoinPage } from './join.page';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatGridListModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: 'join',
        component: JoinPage,
      }
    ])
  ],
  declarations: [JoinPage],
})
export class JoinPageModule {
    housingGroups: string[] = ['Pittsburgh', 'Oakland', 'Shadyside', 'Squirrel Hill', 'Lawrenceville', 'Southside', 'East Liberty'];
 }