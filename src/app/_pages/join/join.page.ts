import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

import { Group } from '_models/group.model';
import { environment } from '_environment';

@Component({
  selector: 'join-page',
  templateUrl: 'join.page.html',
  styleUrls: ['join.page.scss'],
})
export class JoinPage {
  public housingGroups: string[] = ['Pittsburgh', 'Oakland', 'Shadyside', 'Squirrel Hill', 'Lawrenceville', 'Southside', 'East Liberty', 'Strip District', 'Mount Washington', 'Downtown', 'Duquesne Heights'];

  public env: any;
  public groups: any = [];
  constructor(
    private apiService: ApiService,
  ) {
    this.env = environment;

    // Gets the group from the API and assigned them to this.groups
    this.apiService.getGroups().subscribe( res => {
      this.groups = res;
    },
    err => {
      console.log('err', err);
    });
  }

  ngOnInit() {

  }

}
