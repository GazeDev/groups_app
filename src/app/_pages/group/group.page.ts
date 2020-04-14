import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';
import { Post } from '_models/post.model';
import { AlertService } from '_services/alert.service';
import { environment } from '_environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  title: string;
  short_description: string;
  description: string;
}

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
    public dialog: MatDialog,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialog, {
      width: '250px',
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.name = result;
    });
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
        let postId = postResponse.id;
        this.displayPostCreatedToast(postId);
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

@Component({
  selector: 'create-group-dialog',
  templateUrl: 'group.page.dialog.html',
})
export class CreateGroupDialog {

  constructor(
    public apiService: ApiService,
    public dialogRef: MatDialogRef<CreateGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup(group): void {
    this.apiService.createGroup(group).subscribe(
      groupResponse => {
        let groupId = groupResponse.body.id; // Unsure if we need body
        // this.displayLandlordCreatedToast(landlordId); // Leave for later
        // this.form.reset();
        // this.formDirective.resetForm();
      },
      // err => {
      //   if (err.status == 422) {
      //     this.alertService.action({
      //       data: {
      //         message: 'A group with that title already exists.',
      //       }
      //     });
      //   }
      // });
    )
  }

  submit() {
   // this.currentlySubmitting = true;
   // this.submitAttempt = true;

   // if (!this.form.valid) {
   //   console.log('form invalid!');
   //   return;
   // }

   // let formValues = this.form.value;
   let group: Group = {};

   group['title'] = this.data.title;
   group['short_description'] = this.data.short_description;
   group['description'] = this.data.description;

   this.apiService.getAccount().subscribe(
     response => {
       group['AdminId'] = response.id;
       this.createGroup(group);
     },
   );
   //TEMPORARY MESSAGE: DON"T KNOW IF WE SHOULD HAVE AN CATCH HERE FOR IF THERE IS NO USER


   //
   // for (var key in formValues) {
   //   if (
   //     formValues[key] === '' ||
   //     formValues[key] === null
   //   ) {
   //     continue;
   //   }
//
   //   switch (key) {
   //     case 'landlordQuickInfo':
   //       landlord.quickInfo = formValues[key];
   //       break;
   //     case 'claimOwnership':
   //       // we'll manually check this later and look up account info if checked
   //       // but we do need to prevent it from being added to landlord as is
   //       break;
   //     default:
   //       landlord[key] = formValues[key];
   //   }
   // }

   // if (formValues.claimOwnership === true) {
   //   this.apiService.getAccount().subscribe(
   //     response => {
   //       landlord.AuthorId = response.id;
   //       this.addLandlord(landlord);
   //     },
   //   );
   // } else {
   //   this.createGroup(group);
   // }
 }

}
