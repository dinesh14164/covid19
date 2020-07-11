import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ],
  exports: [NotificationComponent],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
