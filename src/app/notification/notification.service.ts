import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = 'https://covid19-novo-invent.herokuapp.com';
  VAPID_PUBLIC_KEY = 'BEXw8_OYaWguSgFor2J6u4seVOM6Tc4C6T0aejxK415qRGIGTv4WHlEiXwPEhoOLOlVRCiDOGrG4ZqGM3x-9uJ4';
  notificationEmmiter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  notificationSend: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient, private swPush: SwPush) { }

  subscribeToNotification() {
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      console.log(sub);
      this.sendToServer(sub)
    })
    .catch(err => console.error('Could not subscribe to notifications', err));
  }
  sendToServer(params: any) {
    this.http.post(`${this.url}/notification/subscribe`, { notification : params }).subscribe((data: IMessage) => {
    console.log('Notification Service: ,', data)
    if (data.status == 'success') {
        this.notificationEmmiter.next(true);
      }
    });
  }
  pushNotification() {
    this.http.get(`${this.url}/notification/send`).subscribe((data: IMessage) => {
      if (data.status == 'success') {
        this.notificationSend.next(true);
      }
    });
  }
}
