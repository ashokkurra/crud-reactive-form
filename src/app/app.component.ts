import { Component } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from "./app.service";
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from "./user-form/user-form.component";

export interface UserElement {
  id: number,
  firstName: string,
  lastName: string,
  emailId: string,
  contactNumber: string,
  dateOfBirth: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['select', 'id', 'firstName', 'lastName', 'emailId', 'contactNumber', 'dateOfBirth'];
  selectedIndex: number = -1;
  dataSource = new MatTableDataSource<UserElement>([]);
  selection = new SelectionModel<UserElement>(true, []);

  constructor(public dialog: MatDialog, private appService: AppService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.appService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  onChanged(row, i) {
    this.selectedIndex = i;
    this.selection.clear();
    this.selection.select(row);
  }

  addRow() {
    this.openFormDialog('add', null);
  }

  updateRow() {
    if (this.selection.selected.length) {
      this.openFormDialog('update', this.selection.selected[0]);
    }
  }

  openFormDialog(mode, row) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '350px',
      data: { mode, row }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedIndex = -1;
      this.getAllUsers();
    });
  }

  deleteRow() {
    if (this.selection.selected.length) {
      this.appService.deleteUser(this.selection.selected[0].id).subscribe((res) => {
        this.selectedIndex = -1;
        this.getAllUsers();
      });
    }
  }
}
