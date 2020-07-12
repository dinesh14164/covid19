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
  sent: boolean;
  constructor(private swPush: SwPush, private nService: NotificationService) { }

  ngOnInit(): void {
    this.nService.notificationEmmiter.subscribe(check => {
      if(check) {
        this.isGranted = Notification.permission === 'granted';
      }
    });
    this.nService.notificationSend.subscribe(check => {
      if(check) {
        this.sent = true;
        setTimeout(() => {this.sent = false;}, 3000)
      }
    })
  }
  submitNotification(): void {
    this.nService.subscribeToNotification();
  }
  sendNotification() {
    this.nService.pushNotification();
  }
}
