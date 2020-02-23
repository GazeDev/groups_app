import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'join-page',
  templateUrl: 'join.page.html',
  styleUrls: ['join.page.scss'],
})
export class JoinPage {

  constructor(
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {

  }

}
