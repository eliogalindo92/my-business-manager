import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from "../services/api.service";
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit{

  productForm !: FormGroup;
  actionButton: string = 'Save';
  dialogName: string = "Add a new product.";
  progressBar: boolean = false;
  suppliers: any = [];
  constructor(private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private _snackBar: MatSnackBar, private api: ApiService) {}


  ngOnInit(): void {
    this.getSuppliers()
    this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      cost: ['', Validators.required],
      measurement_unit: ['', Validators.required],
      supplier: ['', Validators.required]
    });

    if (this.editData){
      this.dialogName = "Update the selected product."
      this.actionButton = 'Update';
      this.productForm.controls['code'].setValue(this.editData.code);
      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['type'].setValue(this.editData.type);
      this.productForm.controls['cost'].setValue(this.editData.cost);
      this.productForm.controls['measurement_unit'].setValue(this.editData.measurement_unit);
      this.productForm.controls['supplier'].setValue(this.editData.suppliers[0].id, this.editData.suppliers[0].name);
    }
  }

  getSuppliers(){
    this.api.getSuppliers().subscribe({
      next:(res)=>{
        this.suppliers = Array.from(res);
      },
      error:()=>{
        this._snackBar.open('Ups, something went wrong', 'X', {
          duration: 3000
        });
      }
    });
  }
  addProduct(){
    if(!this.editData){
      if (this.productForm.valid){
        this.progressBar = true;
        this.api.storeProduct(this.productForm.value)
          .subscribe({
            next:(res)=>{
              this.productForm.reset();
              this.matDialogRef.close('save');
              let message = res.message;
              this._snackBar.open(message, 'X', {
                duration: 3000
              });
            },
            error:(err)=>{
              this.progressBar = false;
              let message = err.error.message;
              this._snackBar.open(message, 'X', {
                duration: 3000
              });
            }
          });
      }
      else {
        this.progressBar = false;
        this._snackBar.open('You must add valid data!', 'X', {
          duration: 3000
        });
      }
    }
    else {
      this.updateProduct()
    }
  }
  updateProduct() {
    if (this.productForm.valid){
      this.progressBar = true;
      this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
        next:(res)=>{
          this.productForm.reset();
          this.matDialogRef.close('update');
          let message = res.message;
          this._snackBar.open(message, 'X', {
            duration: 3000
          });
        },
        error:(err)=>{
          this.progressBar = false;
          let message = err.error.message;
          this._snackBar.open(message, 'X', {
            duration: 3000
          });
        }
      });
    }
    else {
      this.progressBar = false;
      this._snackBar.open('You must add valid data!', 'X', {
        duration: 3000
      });
    }
  }
}
