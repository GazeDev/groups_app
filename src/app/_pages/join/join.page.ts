import { Component } from '@angular/core';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';

import { Group } from '_models/group.model';
import { environment } from '_environment';

@Component({
  selector: 'join-page',
  templateUrl: 'join.page.html',
  styleUrls: ['join.page.scss'],
})
export class JoinPage {
  // public housingGroups: string[] = ['Pittsburgh', 'Oakland', 'Shadyside', 'Squirrel Hill', 'Lawrenceville', 'Southside', 'East Liberty', 'Strip District', 'Mount Washington', 'Downtown', 'Duquesne Heights'];

  public env: any;
  public allGroups: any = [];
  constructor(
    public authService: AuthenticationService,
    public apiService: ApiService,
  ) {
    this.env = environment;

    // Gets the group from the API and assigned them to this.groups
    this.apiService.getGroups().subscribe( res => {
      this.allGroups = res;
    },
    err => {
      console.log('err', err);
    });
  }


  // createGroup(group): void {
  //   this.apiService.createGroup(group).subscribe(
  //     groupResponse => {
  //       let groupId = groupResponse.body.id; // Unsure if we need body
  //       // this.displayLandlordCreatedToast(landlordId); // Leave for later
  //       // this.form.reset();
  //       // this.formDirective.resetForm();
  //     },
  //     // err => {
  //     //   if (err.status == 422) {
  //     //     this.alertService.action({
  //     //       data: {
  //     //         message: 'A group with that title already exists.',
  //     //       }
  //     //     });
  //     //   }
  //     // });
  //   )
  // }

  ngOnInit() {

  }

}
