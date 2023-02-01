import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {MaterialUIModule} from "../material-ui/material-ui.module";
import { DashboardComponent } from '../dashboard/dashboard.component';
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialUIModule,
        MatMenuModule,
    ]
})
export class DashboardModule { }
