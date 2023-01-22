import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { DeleteSupplierDialogComponent } from './delete-supplier-dialog/delete-supplier-dialog.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    DashboardComponent,
    ProductDialogComponent,
    DeleteProductDialogComponent,
    SuppliersComponent,
    SupplierDialogComponent,
    DeleteSupplierDialogComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
