import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  progressBar: boolean = false;

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.progressBar = true;
      this.api.login().subscribe({
        next: (res) => {
          const user = res.find((values: any) => {
            return values.email === this.loginForm.value.email && values.password === this.loginForm.value.password;
          });
          if (user) {
            this.loginForm.reset();
            this.router.navigate(['dashboard']).then(x => true);
          } else {
            this.progressBar = false;
            this._snackBar.open('Invalid credentials', 'X', {
              duration: 3000
            });
          }
        },
          error: (err) => {
          let message = err.error.message;
          this._snackBar.open(message, 'X', {
            duration: 3000
          });
        }
      });
    }
    else {
      this.progressBar = false;
      this._snackBar.open('You must insert valid credentials', 'X', {
        duration: 3000
      });
    }
  }
}
