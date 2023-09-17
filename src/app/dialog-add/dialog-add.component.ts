import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss'],
})
export class DialogAddComponent {
  registerForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initRegisterForm();
    if (this.data.viewMode == 'view' || this.data.viewMode == 'edit') {
      this.patchValues();
    }
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(
        { value: '', disabled: this.data.viewMode == 'view' },
        [Validators.min(3), Validators.max(30), Validators.required]
      ),
      age: new FormControl(
        { value: '', disabled: this.data.viewMode == 'view' },
        [Validators.minLength(1), Validators.maxLength(2), Validators.required]
      ),
      birthOfDate: new FormControl(
        { value: '', disabled: this.data.viewMode == 'view' },
        [Validators.required]
      ),
      address: new FormControl(
        { value: '', disabled: this.data.viewMode == 'view' },
        [Validators.required]
      ),
    });
  }

  patchValues() {
    this.registerForm.patchValue({
      id: this.data.empObj.id,
      name: this.data.empObj.name,
      age: this.data.empObj.age,
      birthOfDate: this.data.empObj.birthOfDate,
      address: this.data.empObj.address,
    });
  }

  register(type: string) {
    this.dialogRef.close({
      registerForm: this.registerForm.value,
      type: type,
    });
  }
}
