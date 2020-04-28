import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';
import { Post } from '_models/post.model';
import { AlertService } from '_services/alert.service';
import { environment } from '_environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
})
export class GroupPage {
  @ViewChild('ngFormDirective') formDirective;
  public form: FormGroup;
  public env: any;
  public group: any;
  public posts: any;
  public groupId: string;
  public groups: any = [];
  name: string;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthenticationService,
    public apiService: ApiService,
    private alertService: AlertService,
  ) {
    this.env = environment;
    this.form = this.formBuilder.group({
      title: [''],
      body: [''],
    });

    this.group = <Group>{};
    this.posts = [];

    // Gets the group from the API and assigned them to this.groups
    this.apiService.getGroups().subscribe( res => {
      this.groups = res;
    },
    err => {
      console.log('err', err);
    });
  }

  async ngOnInit() {
    // await this.authenticationService.checkLogin();
    // if (this.authenticationService.isAuthenticated) {
    //   this.getAccount();
    // }

    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('id');
      this.getGroup();
      this.getPosts();
    });
  }

  getGroup() {
    this.apiService.getGroup(this.groupId).subscribe(res => {
      this.group = res;
    },
    err => {
      console.log(err);
    })
  }

  getPosts() {
    this.apiService.getGroupPosts(this.groupId).subscribe(res => {
      this.posts = res;
    })
  }

  async doLogin() {
    await this.authService.login();
  }

  post() {
    let formValues = this.form.value;
    let post = this.postMapLocalToApi(formValues);
    this.createPost(post);
  }

  postMapLocalToApi(formValues) {
    let post: any = {};
    post.title = formValues.title;
    post.body = formValues.body;
    return post;
  }

  createPost(post) {
    console.log(post);
    this.apiService.createPost(post, this.groupId).subscribe(
      postResponse => {
        this.getPosts();
        this.resetForm();
      },
      postErrorResponse => {
        let propertyId = postErrorResponse.headers.get('Content-Location');
        if (postErrorResponse.status === 422 && propertyId) {
          // Post already exists and we should let the user know
          this.displayPostExistsToast(propertyId);
          this.resetForm();
        } else {
          console.log('Error adding the post. Not 422, or no contentLocation', postErrorResponse);
        }
      }
    );
  }

  resetForm() {
    this.form.reset();
    this.formDirective.resetForm();
  }

  displayPostCreatedToast(postId) {
    this.alertService.action({
      data: {
        message: 'The post has been created.',
        action: {
          text: 'View Post',
          navigateTo: `/posts/${postId}`,
        },
      }
    });
  }

  displayPostExistsToast(postId) {
    this.alertService.action({
      data: {
        message: 'It looks like we already have a post.',
        action: {
          text: 'View Post',
          navigateTo: `/posts/${postId}`,
        },
      }
    });
  }
}
