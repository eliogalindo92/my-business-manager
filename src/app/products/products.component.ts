import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from "../services/api.service";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {DeleteProductDialogComponent} from "../delete-product-dialog/delete-product-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['code', 'name', 'type', 'cost', 'measurement_unit', 'suppliers', 'options'];
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
    this.dialog.open(ProductDialogComponent, {
      width: 'auto',
    }).afterClosed().subscribe(
      value => {
        if (value === "save"){
          this.getProducts();
        }
      }
    );
  }

  editProduct(row: any){
    this.dialog.open(ProductDialogComponent,
      {
        width: 'auto',
        data: row,
      }).afterClosed().subscribe(
        value => {
        if (value === 'update'){
          this.getProducts();
        }
    });
  }

  openConfirmationDialog(id: number) {
    this.dialog.open(DeleteProductDialogComponent, {
      width: 'auto',
      data: id
    }).afterClosed().subscribe(
      value => {
        if (value === 'yes'){
          this.getProducts();
        }
      }
    );
  }

  getProducts() {
    this.api.getProducts().subscribe(
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
    this.getProducts();
  }

}
