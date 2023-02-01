import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
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

  loginForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn(){
    if (this.loginForm.valid){
      let data = this.loginForm.value;

      // Get the CSRF Cookie
      this.api.getCSRFCookie().subscribe({
        next:()=>{
          this.progressBar = true;

          // Call the login method
          this.api.logIn(data).subscribe({
            next:(res)=>{
              if (res.user.role === 'Administrator'){
                this.auth.saveUser(res.user.name, 'ra');
              }
              else {
                this.auth.saveUser(res.user.name, 'rc');
              }
              this.loginForm.reset();
              this.router.navigate(['/dashboard']).then();

            },
            error:(err)=>{
              this.progressBar = false;
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
