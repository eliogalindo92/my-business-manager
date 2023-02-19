import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
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
import {AuthService} from "./services/auth.service";
import {ApiService} from "./services/api.service";
import {GuardianService} from "./services/guardian.service";
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";




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
        UsersComponent,
        UserDialogComponent,
        DeleteUserDialogComponent,
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
    providers: [AuthService, ApiService, GuardianService, {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true }],
  exports: [
    ProductsComponent,
    SuppliersComponent,
    HomeComponent,
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
