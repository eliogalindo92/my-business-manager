import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  name!: string;
  admin = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(private breakpointObserver: BreakpointObserver,  private api: ApiService, private _snackBar: MatSnackBar, private auth: AuthService, private router: Router) {}

  logout(){
    this.api.logout().subscribe({
      next:(res)=>{
        let message = res.message;
        this._snackBar.open(message, 'X', {
          duration: 3000
        });
        this.auth.forgetSession();
      },
      error:(err)=>{
        let errors = catchError(err);
        console.log(errors);
      }
    });
    this.router.navigate(['/login']).then(() => true);
  }

  ngOnInit(): void {
    this.name = this.auth.getUser();

    if (this.auth.getRole() === 'Client'){
      this.admin = false;
    }
  }


}




