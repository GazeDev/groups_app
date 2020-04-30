import { Input, Component, ViewChild } from '@angular/core';
import { ContentService } from '_services/index';
import { ApiService } from '_services/api.service';

@Component({
  selector: 'comment-card',
  templateUrl: 'comment-card.html',
  styleUrls: ['comment-card.scss']
})
export class CommentCardComponent {
  @Input('comment')
  public comment: any;

  constructor (
    public content: ContentService,
    public apiService: ApiService,
  ) {
  }
}
