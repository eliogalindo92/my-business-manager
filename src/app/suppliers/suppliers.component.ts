import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from "../services/api.service";
import {SupplierDialogComponent} from "../supplier-dialog/supplier-dialog.component";
import {DeleteSupplierDialogComponent} from "../delete-supplier-dialog/delete-supplier-dialog.component";

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit{

  displayedColumns: string[] = ['code', 'name', 'phone_number', 'address', 'options'];
  dataSource!: MatTableDataSource<any>;

  progressBar: boolean = false;
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
    this.dialog.open(SupplierDialogComponent, {
      width: 'auto',
    }).afterClosed().subscribe(
      value => {
        if (value === "save"){
          this.getSuppliers();
        }
      }
    );
  }

  editProduct(row: any){
    this.dialog.open(SupplierDialogComponent,
      {
        width: 'auto',
        data: row,
      }).afterClosed().subscribe(
      value => {
        if (value === 'update'){
          this.getSuppliers();
        }
      });
  }

  openConfirmationDialog(id: number) {
    this.dialog.open(DeleteSupplierDialogComponent, {
      width: 'auto',
      data: id
    }).afterClosed().subscribe(
      value => {
        if (value === 'yes'){
          this.getSuppliers();
        }
      }
    );
  }

  getSuppliers() {
    this.api.getSuppliers().subscribe(
      {
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.ngAfterViewInit();
        },
        error: (err)=>{
          let message = err.error.message
          this._snackBar.open(message, 'X', {
            duration: 3000,
          });
        }
      }
    );
  }
  ngOnInit(): void {
    this.getSuppliers();
  }

}
