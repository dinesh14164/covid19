import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  VAPID_PUBLIC_KEY = 'BEXw8_OYaWguSgFor2J6u4seVOM6Tc4C6T0aejxK415qRGIGTv4WHlEiXwPEhoOLOlVRCiDOGrG4ZqGM3x-9uJ4';
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
    this.http.post('http://localhost:3000/notification/subscribe', { notification : params }).subscribe(data => {
      console.log('Server: ', data);
    });
  }
}
