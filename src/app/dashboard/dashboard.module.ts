import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from './dashboard.service';

import { ChartsModule } from 'ng2-charts';
import { CovidChartsComponent } from './covid-charts/covid-charts.component';
import { MatSliderModule } from '@angular/material/slider';
import { TableComponent } from './table/table.component';
import { CovidCardComponent } from './covid-card/covid-card.component';
import { SelectCountryComponent } from './select-country/select-country.component';
import { FormsModule } from '@angular/forms';
import { SelectDateComponent } from './select-date/select-date.component';

@NgModule({
  declarations: [DashboardComponent, CovidChartsComponent, TableComponent, CovidCardComponent, SelectCountryComponent, SelectDateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    DashboardRoutingModule,
    ChartsModule,
    FormsModule
  ],
  exports: [DashboardComponent],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
