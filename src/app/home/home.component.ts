import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { DialogAddComponent } from '../dialog-add/dialog-add.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  employeeList: Employee[] = [];

  constructor(public dialog: MatDialog,public ts:ToastrService) {}

  openDialog(viewMode: string, empObj?: any) {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      width: '700px',
      data: {
        empObj: empObj,
        viewMode: viewMode,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.type == 'add') {
          result.registerForm.id = this.employeeList.length + 1;
          this.employeeList.push(result.registerForm);
           this.showSuccessAdd()
        } else if (result.type == 'edit') {
          for (let i = 0; i < this.employeeList.length; i++) {
            if (result.registerForm.id == this.employeeList[i].id) {
              this.employeeList[i] = result.registerForm;
              this.showSuccessEdit()
              return;
            }
          }
        }
      }
    });
  }

  delete(index: any) {
    this.employeeList.splice(index, 1);
     this.showDelete()
  };
  showSuccessAdd(){
    this.ts.success('ADD Successful', 'Major ADD', {
    timeOut: 3000,
    });
  }
  showSuccessEdit(){
    this.ts.success('Edit Successful', 'Major Edit', {
    timeOut: 3000,
    });
  }
  showDelete(){
    this.ts.error('Delete Successful', 'Major Delete', {
   timeOut: 3000,
 });
   }
}
