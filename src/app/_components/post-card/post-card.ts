import { Input, Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '_services/index';

@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html',
  styleUrls: ['post-card.scss'],
})
export class PostCardComponent {

  @Input('post')
  public post: any;
  public isTarget: boolean;

  constructor (
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    public content: ContentService,
  ) {
    this.isTarget = false;
  }

}
