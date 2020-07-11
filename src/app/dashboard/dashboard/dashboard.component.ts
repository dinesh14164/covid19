import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CommonUtils } from 'src/app/core/common-utils';
import { ITableData } from '../dashboard.model';
import { CovidChartsComponent } from '../covid-charts/covid-charts.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  countries = [];
  graphData;
  total_cases;
  total_deaths;
  new_cases;
  new_deaths;
  dates;
  maxCases: number;
  maxDeaths: number;
  maxCasesCountryCode: string;
  selectedCountry: string;
  tableData: ITableData[];
  covidData;
  @ViewChild(CovidChartsComponent, { static: false }) covidCharts: CovidChartsComponent;
  @ViewChild(TableComponent, { static: false }) tableComp: TableComponent;
  constructor(private dashBoardService: DashboardService) { }

  ngOnInit(): void {
    console.log('Dashboard Calling api')
    this.dashBoardService.getData().subscribe(data => {
      // console.log('Data')
      this.covidData = data;
      console.log(data);
      this.countries = CommonUtils.getCountriesData(data);
      // console.log('Countries: ', this.countries);
      this.tableData = CommonUtils.tableData;  
      this.tableData.sort((a, b) => b.total_cases && a.total_cases ? b.total_cases - a.total_cases : -1);
      this.maxCases = this.tableData[0].total_cases;
      this.maxDeaths = this.tableData[0].total_deaths;
      this.maxCasesCountryCode = this.tableData[0].code;
      this.selectedCountry = this.tableData[0].country;
      this.graphData = CommonUtils.getGraphData(data[this.maxCasesCountryCode].data);
      this.total_cases = this.graphData.total_cases;
      this.total_deaths = this.graphData.total_deaths;
      this.new_cases = this.graphData.new_cases;
      this.new_deaths = this.graphData.new_deaths;
      this.dates = this.graphData.dates;
    });
    this.dashBoardService.countryChangeEvent.subscribe(code => {
      if(code) {
        this.getCountryData(code);
      }
    });
    this.dashBoardService.dateChanged.subscribe(date => {
      console.log('Date: ', date);
      CommonUtils.getTableData(this.covidData, date);
      this.tableData = CommonUtils.tableData; 
      this.tableData.sort((a, b) => b.total_cases && a.total_cases ? b.total_cases - a.total_cases : -1);
      this.tableComp.ngOnChanges();
      console.log('this.tableData: ',this.tableData)
    });
  }
  getCountryData(code: string) {
    const tElement = this.tableData.find(ele => ele.code == code); 
    this.maxCases = tElement.total_cases;
    this.maxDeaths = tElement.total_deaths;
    this.maxCasesCountryCode = tElement.code;
    this.selectedCountry = tElement.country;
    const cData = this.covidData[code];
    this.graphData = CommonUtils.getGraphData(cData.data);
    this.total_cases = this.graphData.total_cases;
    this.total_deaths = this.graphData.total_deaths;
    this.new_cases = this.graphData.new_cases;
    this.new_deaths = this.graphData.new_deaths;
    this.dates = this.graphData.dates;
    this.covidCharts.ngOnChanges();
  }
}
