import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApiService} from "../services/api.service";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'email', 'role', 'options'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private api: ApiService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(UserDialogComponent, {
      width: 'auto',
    }).afterClosed().subscribe(
      value => {
        if (value === "save"){
          this.getUsers();
        }
      }
    );
  }

  openConfirmationDialog(id: number) {
    this.dialog.open(DeleteUserDialogComponent, {
      width: 'auto',
      data: id
    }).afterClosed().subscribe(
      value => {
        if (value === 'yes'){
          this.getUsers();
        }
      }
    );
  }

  getUsers() {
    this.api.getUsers().subscribe(
      {
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.ngAfterViewInit();
        },
        error: ()=>{
          this._snackBar.open('Ups, something went wrong', 'X', {
            duration: 3000,
          });
        }
      }
    );
  }
  ngOnInit(): void {
    this.getUsers();
  }
}
