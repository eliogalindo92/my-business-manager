import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {HomeComponent} from "../home/home.component";
import {SuppliersComponent} from "../suppliers/suppliers.component";
import {ProductsComponent} from "../products/products.component";

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: '', component: SuppliersComponent },
      { path: 'suppliers', component: SuppliersComponent },
      { path: 'products', component: ProductsComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
