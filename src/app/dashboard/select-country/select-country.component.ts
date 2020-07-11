import { Component, OnInit, Input } from '@angular/core';
import { ICountry } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit {
  @Input() countries: ICountry[] = [];
  @Input() selected: string;
  countriesist: Food[] = [];
  selectedCountry: string;
  constructor(private dbService: DashboardService) { }

  ngOnInit(): void {
    console.log('countries: ', this.countries);
    this.selectedCountry = this.selected;
    this.getListData();
  }
  getListData() {
    this.countries.forEach(ele => {
      this.countriesist.push({value: ele.countryCode, viewValue: ele.countryName})
    });
  }
  newCountry(code: string) {
    console.log('çhanges: ', code);
    this.dbService.countryChangeEvent.next(code);
  }
}
