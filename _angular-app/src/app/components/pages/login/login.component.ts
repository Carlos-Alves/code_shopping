import { Component, OnInit } from '@angular/core';
import {headersToString} from 'selenium-webdriver/http';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
      email: 'admin@user.com',
      password: 'secret'
  };

  showMessageError = false;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.authService.login(this.credentials)
        .subscribe((data) => {
        this.router.navigate(['categories/list']);
        }, () => this.showMessageError = true);
      return false;
  }

}
