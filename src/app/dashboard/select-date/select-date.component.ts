import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CommonUtils } from 'src/app/core/common-utils';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {
  @Input() selectedDate: string;
  dates: string[];
  dateList: Food[] = [];
  currentDate: string;
  constructor(private dbService: DashboardService) { }

  ngOnInit(): void {
    this.currentDate = this.selectedDate;
    this.dates = CommonUtils.dates;
    this.getListData();
  }

  getListData() {
    this.dates.forEach(ele => {
      this.dateList.push({value: ele, viewValue: ele})
    });
  }
  newDate(date: string) {
    this.dbService.dateChanged.next(date);
  }
}
