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
      this.comments = [];
      let arrayLength = res.length;

      for(let i = 0 ; i < arrayLength; i++) {

         let val = res[i];
         let comment: any = {};
         comment['id'] = val.id;
         comment['body'] = val.body;
         comment['postId'] = val.PostId;

         this.apiService.getAccount(val.AuthorId).subscribe(
           response => {
             comment['displayName'] = response.body.displayName;
             this.comments.push(comment)
           });

      }
    })
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
