import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';

@Component({
  selector: 'join-page',
  templateUrl: 'join.page.html',
  styleUrls: ['join.page.scss'],
})
export class JoinPage {
  public joinGroups: Group[] = [];
  constructor(
    private apiService: ApiService,
  ) {

    this.apiService.getGroups().subscribe(res => {
      this.joinGroups = res;
    },
    err => {
      console.log('err', err);
    });
  }

  ngOnInit() {
  }

}
