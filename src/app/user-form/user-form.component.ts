import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from "../app.service";

export interface DialogData {
  mode: string;
  row: any;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private appService: AppService) { }

  ngOnInit(): void {
    console.log(this.data)
    this.userForm = new FormGroup({
      firstName: new FormControl(this.data.row ? this.data.row.firstName : '', Validators.required),
      lastName: new FormControl(this.data.row ? this.data.row.lastName : '', Validators.required),
      emailId: new FormControl(this.data.row ? this.data.row.emailId : '', Validators.required),
      contactNumber: new FormControl(this.data.row ? this.data.row.contactNumber : '', Validators.required),
      dateOfBirth: new FormControl(this.data.row ? new Date(this.data.row.dateOfBirth) : '', Validators.required)
    });
  }

  userSubmit() {
    if (this.userForm.valid) {
      let formValues = { ...this.userForm.value };
      if (this.data.mode === 'add') {
        formValues.id = Date.now();
        this.appService.postUser(formValues).subscribe((res) => {
          this.dialogRef.close();
        })
      } else {
        this.appService.putUser(this.data.row.id, formValues).subscribe((res) => {
          this.dialogRef.close();
        })
      }
    }
  }
}
