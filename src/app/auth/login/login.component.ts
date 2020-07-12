import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../auth.service';
import { IMessage } from '../auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hasError: boolean;
  message: string;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
  hide = true;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  onSubmit(){
    console.warn(this.signupForm.value);
    this.hasError = false;
    this.message = undefined;
    this.authService.getToken({email: this.signupForm.value.email, password: this.signupForm.value.password}).subscribe(
      (data: IMessage) => {
        console.log('token:', data);
        if(data.status !== 'success' && !data.token) {
          this.hasError = true;
          this.message = data.message;
        } else {
          this.hasError = false;
          this.message = 'Login successfull, redirecting to prifile';
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email)
          setTimeout(() => {
            this.route.navigate(['/auth/profile'])
          }, 2000);
        }
      },
      (err) => {
        this.hasError = true;
        this.message = 'Something went wrong';
      }
    );
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'Length should be more than 4' : '';
  }

}
