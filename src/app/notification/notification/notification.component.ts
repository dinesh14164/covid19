import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  constructor(private swPush: SwPush, private nService: NotificationService) { }

  ngOnInit(): void {
  }
  submitNotification(): void {
    this.nService.subscribeToNotification();
  }
}
