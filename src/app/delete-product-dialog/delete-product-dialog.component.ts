import {Component, Inject} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.css']
})
export class DeleteProductDialogComponent {

  constructor( private api: ApiService, private matDialogRef: MatDialogRef<DeleteProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public id: number, private _snackBar: MatSnackBar) {}
  deleteProduct() {
    this.api.deleteProduct(this.id).subscribe({
      next:(res)=>{
        this.matDialogRef.close('yes');
        this._snackBar.open('Product deleted successfully', 'X', {
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
