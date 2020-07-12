import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showProfile: boolean;
  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authEmmiter.subscribe(check => {
      console.log('emitter')
      this.showHeader();
    });
  }

  showHeader() {
    const token = localStorage.getItem('token');
    if (token) {
      this.showProfile = true;
    } else {
      this.showProfile = false;
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.showHeader();
    this.route.navigate(['/auth/login'])
  }
}
