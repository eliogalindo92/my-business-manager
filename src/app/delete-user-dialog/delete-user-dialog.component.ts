import {Component, Inject} from '@angular/core';
import {ApiService} from "../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent {
  constructor( private api: ApiService, private matDialogRef: MatDialogRef<DeleteUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public id: number, private _snackBar: MatSnackBar) {}
  deleteUser() {
    this.api.deleteUser(this.id).subscribe({
      next:(res)=>{
        this.matDialogRef.close('yes');
        this._snackBar.open('User deleted successfully', 'X', {
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
