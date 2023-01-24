import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialUIModule} from "./material-ui/material-ui.module";

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { DeleteProductDialogComponent } from './delete-product-dialog/delete-product-dialog.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { DeleteSupplierDialogComponent } from './delete-supplier-dialog/delete-supplier-dialog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';






@NgModule({
    declarations: [
        AppComponent,
        ProductsComponent,
        ProductDialogComponent,
        DeleteProductDialogComponent,
        SuppliersComponent,
        SupplierDialogComponent,
        DeleteSupplierDialogComponent,
        HomeComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialUIModule,

    ],
    providers: [],
  exports: [
    ProductsComponent,
    SuppliersComponent,
    HomeComponent
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
