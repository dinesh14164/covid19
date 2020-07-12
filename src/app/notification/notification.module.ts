import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';

import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [NotificationComponent],
  providers: [
    NotificationService
  ]
})
export class NotificationModule { }
