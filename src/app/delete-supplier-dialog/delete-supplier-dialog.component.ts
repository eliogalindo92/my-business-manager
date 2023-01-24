import {Component, Inject} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-supplier-dialog',
  templateUrl: './delete-supplier-dialog.component.html',
  styleUrls: ['./delete-supplier-dialog.component.css']
})
export class DeleteSupplierDialogComponent {

  constructor( private api: ApiService, private matDialogRef: MatDialogRef<DeleteSupplierDialogComponent>, @Inject(MAT_DIALOG_DATA) public id: number, private _snackBar: MatSnackBar) {}
  deleteSupplier() {
    this.api.deleteSupplier(this.id).subscribe({
      next:(res)=>{
        this.matDialogRef.close('yes');
        this._snackBar.open('Supplier deleted successfully', 'X', {
          duration: 3000
        });
      },
      error:(err)=>{
        let message = err.error.message;
        this._snackBar.open(message, 'X', {
          duration: 3000
        });
      }
    });
  }
}
