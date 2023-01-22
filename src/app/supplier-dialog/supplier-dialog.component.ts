import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent {

  supplierForm !: FormGroup;
  actionButton: string = 'Save';
  constructor(private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<SupplierDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private _snackBar: MatSnackBar, private api: ApiService) {}


  ngOnInit(): void {
    this.supplierForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],

    });
    if (this.editData){
      this.actionButton = 'Update';
      this.supplierForm.controls['code'].setValue(this.editData.code);
      this.supplierForm.controls['name'].setValue(this.editData.name);
      this.supplierForm.controls['phone_number'].setValue(this.editData.phone_number);
      this.supplierForm.controls['address'].setValue(this.editData.address);
    }
  }

  addSupplier(){
    if(!this.editData){
      if (this.supplierForm.valid){
        this.api.storeSupplier(this.supplierForm.value)
          .subscribe({
            next:(res)=>{
              this.supplierForm.reset();
              this.matDialogRef.close('save');
              this._snackBar.open('Supplier added successfully', 'X', {
                duration: 3000
              });
            },
            error:(err)=>{
              console.log(err);
              this._snackBar.open('Something went wrong', 'X', {
                duration: 3000
              });
            }
          });
      }
      else {
        this._snackBar.open('You must add valid data!', 'X', {
          duration: 3000
        });
      }
    }
    else {
      this.updateSupplier()
    }
  }
  updateSupplier() {
    if (this.supplierForm.valid){
      this.api.updateSupplier(this.supplierForm.value, this.editData.id).subscribe({
        next:(res)=>{
          this.supplierForm.reset();
          this.matDialogRef.close('update');
          this._snackBar.open('Supplier updated successfully', 'X', {
            duration: 3000
          });
        },
        error:()=>{
          this._snackBar.open('Something went wrong', 'X', {
            duration: 3000
          });
        }
      });
    }
  }
}
