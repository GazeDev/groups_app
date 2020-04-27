import { Input, Component, ViewChild } from '@angular/core';
import { ContentService } from '_services/index';
import { ApiService } from '_services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html',
  styleUrls: ['post-card.scss']
})
export class PostCardComponent {
  @Input('post')
  public post: any;

  @ViewChild('ngFormDirective') formDirective;
  public commentForm: FormGroup;

  public comments: any;
  public isTarget: boolean;

  constructor (
    public content: ContentService,
    public formBuilder: FormBuilder,
    public apiService: ApiService,
  ) {
    this.comments = [];
  }

  ngOnInit() {
    this.getComments();

    this.commentForm = this.formBuilder.group({
      body: [''],
    });
  }

  getComments() {
    this.apiService.getPostComments(this.post.id).subscribe(res => {
      this.comments = res;
      console.log(this.comments);
    })
  }

  commentMapLocalToApi(formValues) {
    let comment: any = {};
    comment.body = formValues.body;
    return comment;
  }

  comment() {
    let formValues = this.commentForm.value;
    let comment = this.commentMapLocalToApi(formValues);
    this.createComment(comment);
  }

  createComment(comment) {
    this.apiService.createComment(this.post.id, comment).subscribe(
      postResponse => {
        console.log(postResponse)
        this.getComments();
        this.resetForm();
      },
      postErrorResponse => {
        console.log("Error ", postErrorResponse)
      }
    );
  }

  resetForm() {
    this.commentForm.reset();
    this.formDirective.resetForm();
  }

}
