import { Component } from '@angular/core';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'dashboard-page',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage {

  constructor(
    private apiService: ApiService,
  ) {

  }

  ngOnInit() {

  }

}
