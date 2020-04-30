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

  public postAuthorDisplayName: any;
  public comments: any;
  public isTarget: boolean;

  constructor (
    public formBuilder: FormBuilder,
    public apiService: ApiService,
  ) {
    this.postAuthorDisplayName = "";
    this.comments = [];
  }

  ngOnInit() {
    this.getPostAuthorDisplayName();
    this.getComments();

    this.commentForm = this.formBuilder.group({
      body: [''],
    });
  }

  getPostAuthorDisplayName() {
    this.apiService.getAccount(this.post.AuthorId).subscribe(res => {
      this.postAuthorDisplayName = res.body.displayName;
    })
  }

  getComments() {
    this.apiService.getPostComments(this.post.id).subscribe(res => {
      this.comments = res;
      for (let comment of this.comments) {
        this.apiService.getAccount(comment.AuthorId).subscribe(response => {
          comment['displayName'] = response.body.displayName;
        });
      }
    });
  }

  comment() {
    let formValues = this.commentForm.value;
    this.createComment(formValues);
  }

  createComment(comment) {
    this.apiService.createComment(this.post.id, comment).subscribe(
      postResponse => {
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
