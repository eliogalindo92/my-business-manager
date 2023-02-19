import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
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
  md5 = require('md5');
  name: any;
  email: any;
  password: any;
  password_confirmation: any;
  role: any;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private matDialogRef: MatDialogRef<UserDialogComponent>, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.password_confirmation = new FormControl('', Validators.required);
    this.role = new FormControl('', Validators.required);
  }
  register(){
    if (this.name.valid && this.email.valid && this.password.valid && this.password_confirmation.valid && this.role.valid){

      let data = {
        'name': this.name.value,
        'email': this.email.value,
        'password': this.md5(this.password.value),
        'password_confirmation': this.md5(this.password_confirmation.value),
        'role': this.role.value
      };

      this.progressBar = true;
      this.api.register(data).subscribe({
        next:(res)=>{
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
      this._snackBar.open('Please, insert valid information', 'X', {
        duration: 3000
      });
    }
  }
}
