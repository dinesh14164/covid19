import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = 'https://covid.ourworldindata.org';
  urlLocal = 'http://localhost:5000';
  countryChangeEvent: EventEmitter<string> = new EventEmitter<string>(null);
  dataChanged: EventEmitter<boolean> = new EventEmitter<boolean>(null);
  dateChanged: EventEmitter<string> = new EventEmitter<string>(null);
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.url}/data/owid-covid-data.json`);
  }
}
