import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  progressBar: boolean = false;
  md5 = require('md5');
  email: any;
  password: any;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {}


  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
  }


  logIn(){
    if (this.email.valid && this.password.valid){

      let data = {
        'email': this.email.value,
        'password': this.md5(this.password.value)
      };
      // Get the CSRF Cookie
      this.api.getCSRFCookie().subscribe({
        next:()=>{
          this.progressBar = true;

          // Call the login method
          this.api.login(data).subscribe({
            next:(res)=>{
              this.auth.saveSession(res.user.name, res.token);
              this.router.navigate(['/dashboard']).then(()=>true);
            },
            error:(err)=>{
              this.progressBar = false;
              console.log(err.error);
              let message = err.error.message;
              this._snackBar.open(message, 'X', {
                duration: 3000
              });
            }
          });

        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else {
      this.progressBar = false;
      this._snackBar.open('Please, insert valid credentials', 'X', {
        duration: 3000
      });
    }
  }
}
