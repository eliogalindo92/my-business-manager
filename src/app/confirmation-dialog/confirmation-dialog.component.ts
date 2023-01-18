import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent{

  constructor( private api: ApiService, private matDialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public id: number) {}
  deleteProduct() {
    this.api.deleteProduct(this.id).subscribe({
      next:(res)=>{
        this.matDialogRef.close('yes');
      },
      error:()=>{
        alert("Error while deleting the product");
      }
    });
  }
}
