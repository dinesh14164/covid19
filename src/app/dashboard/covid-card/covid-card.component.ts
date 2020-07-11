import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-covid-card',
  templateUrl: './covid-card.component.html',
  styleUrls: ['./covid-card.component.scss']
})
export class CovidCardComponent implements OnInit {
  @Input() name: string;
  @Input() cases: number;
  constructor() { }

  ngOnInit(): void {
  }

}
