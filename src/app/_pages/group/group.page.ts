import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '_services/index';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';
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
  public env: any;
  public groups: any = [];
  name: string;
  description: string;

  constructor(
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public apiService: ApiService,
  ) {
    this.env = environment;

    // Gets the group from the API and assigned them to this.groups
    this.apiService.getGroups().subscribe( res => {
      this.groups = res;
    },
    err => {
      console.log('err', err);
    });
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
}

@Component({
  selector: 'create-post-dialog',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'],
})
export class CreatePostForm implements OnInit {
  @ViewChild('ngFormDirective') formDirective;
  public form: FormGroup;

  public userAccount: any;
  public groupId: any;
  public env: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public apiService: ApiService,
  ) {
    this.env = environment;
    this.form = this.formBuilder.group({
      title: [''],
      body: [''],
    });
  }

  async ngOnInit() {
    await this.authenticationService.checkLogin();
    if (this.authenticationService.isAuthenticated) {
      this.getAccount();
    }
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('id');
    });
  }

  getAccount() {
    this.apiService.getAccount().subscribe(res => {
      this.userAccount = res;
    });
  }

  post() {
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
