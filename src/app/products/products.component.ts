import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AddProductComponent} from "../add-product/add-product.component";
import {ApiService} from "../services/api.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  displayedColumns: string[] = ['code', 'name', 'type', 'cost', 'measurement_unit', 'options'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService) {}

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
    this.dialog.open(AddProductComponent, {
      width: 'auto',
    }).afterClosed().subscribe(
      value => {
        if (value === "save"){
          this.getProducts();
        }
      }
    );
  }

  openConfirmationDialog(id: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: id
    }).afterClosed().subscribe(
      value => {
        if (value === "yes"){
          this.getProducts();
        }
      }
    );
  }

  editProduct(row: any){
    this.dialog.open(AddProductComponent,
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
  getProducts() {
    this.api.getProducts().subscribe(
      {
        next: (res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.ngAfterViewInit();
        },
        error: (err)=>{
          alert('Error while fetching the information');
        }
      }
    );
  }
  ngOnInit(): void {
    this.getProducts();
  }

}
