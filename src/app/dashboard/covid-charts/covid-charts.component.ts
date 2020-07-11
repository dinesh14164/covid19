import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-covid-charts',
  templateUrl: './covid-charts.component.html',
  styleUrls: ['./covid-charts.component.scss']
})
export class CovidChartsComponent implements OnInit, OnChanges {
  @Input() dataY = [];
  @Input() dataX = [];
  @Input() name: string;
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  constructor(private dbService: DashboardService) { }

  ngOnInit(): void {
    // console.log('New-Cases : ', this.dataY);
    // console.log('Dates : ', this.dataX);
    // this.dbService.dataChanged.subscribe(ch => {
    //   if(ch) {
    //     this.setChartsData(this.dataX, this.dataY, this.name)
    //   }
    // });
    this.setChartsData(this.dataX, this.dataY, this.name)
    // this.lineChartData = [
    //   { data: this.dataY, label: this.name },
    // ];
    // this.lineChartLabels = this.dataX
  }
  ngOnChanges() {
    this.setChartsData(this.dataX, this.dataY, this.name)
  }
  setChartsData(x, y, label) {
    this.lineChartData = [
      { data: y, label: label },
    ];
    this.lineChartLabels = x; 
  }
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    legend: {
      labels: {
        fontColor: 'orange'
      }
    },
    scales: {
      
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0)',
        },
        display: false
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            color: 'rgba(0,0,0,0)',
          },
          ticks: {
            beginAtZero:true,
            fontColor: 'red'
        },
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(0, 153, 51)',
      pointBackgroundColor: 'rgb(0, 153, 51)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
}
