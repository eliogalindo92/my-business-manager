import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productForm !: FormGroup;
  actionButton: string = 'Save';
  constructor(private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) public editData: any, private api: ApiService) {}


  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      cost: ['', Validators.required],
      measurement_unit: ['', Validators.required],
    });
      if (this.editData){
        this.actionButton = 'Update';
        this.productForm.controls['code'].setValue(this.editData.code);
        this.productForm.controls['name'].setValue(this.editData.name);
        this.productForm.controls['type'].setValue(this.editData.type);
        this.productForm.controls['cost'].setValue(this.editData.cost);
        this.productForm.controls['measurement_unit'].setValue(this.editData.measurement_unit);
      }
  }

  addProduct(){
    if(!this.editData){
      if (this.productForm.valid){
        this.api.storeProduct(this.productForm.value)
          .subscribe({
            next:(res)=>{
              this.productForm.reset();
              this.matDialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the product");
            }
          });
      }
      }
    else {
      this.updateProduct()
    }
  }
  updateProduct() {
    if (this.productForm.valid){
    this.api.updateProduct(this.productForm.value, this.editData.id).subscribe({
      next:(res)=>{
        this.productForm.reset();
        this.matDialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the product");
      }
    });
  }
  }
}

