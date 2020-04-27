import { Component, Inject } from '@angular/core';
import { ApiService } from '_services/api.service';
import { Group } from '_models/group.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  short_description: string;
  description: string;
}

@Component({
  selector: 'create-group-dialog',
  templateUrl: './create-group-dialog.html',
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
        let groupId = groupResponse.body.id;
      },
    )
  }

  submit() {
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
 }
}
