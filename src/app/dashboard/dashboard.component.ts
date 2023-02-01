import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  client: boolean = false;
  admin: boolean = false;
  constructor(private api: ApiService, private _snackBar: MatSnackBar, private auth: AuthService, private router: Router) {}

  logout(){
    this.api.logOut().subscribe({
      next:(res)=>{
        let message = res.message;
        this._snackBar.open(message, 'X', {
          duration: 3000
        });
      },
      error:(err)=>{
        let errors = catchError(err);
        console.log(errors);
      }
    });
    this.auth.forgetUser();
    this.router.navigate(['/login']).then(x => true)
  }

  ngOnInit(): void {
    this.role();
  }
  role(){
    if (this.auth.getRole() === 'ra'){
      this.client = false;
      this.admin = true;
    }
    else if (this.auth.getRole() === 'rc'){
      this.client = true;
      this.admin = false;
    }
  }
}




