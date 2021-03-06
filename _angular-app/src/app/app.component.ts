import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import pace from 'pace';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    pace.start({
      document: false
    });
  }

  canShowNavbar() {
    return this.authService.isAuth();
  }
}
