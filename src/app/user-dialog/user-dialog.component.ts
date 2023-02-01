import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit{
  hide: boolean = true;
  hideConfirmation: boolean = true;
  actionButton: string = 'Save';
  progressBar: boolean = false;
  roles: string []  = ['Administrator', 'Client'];
  dialogName: string = 'Add a new user.';
  signupForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private matDialogRef: MatDialogRef<UserDialogComponent>, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  signUp(){
    if (this.signupForm.valid){
      let data = this.signupForm.value;
      this.progressBar = true;
      this.api.register(data).subscribe({
        next:(res)=>{
          this.signupForm.reset();
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
      })
    }
    else {
      this.progressBar = false;
      this._snackBar.open('Please, insert valid data', 'X', {
        duration: 3000
      });
    }
  }
}
