import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  constructor(private router: Router) { }

  loginRestaurant() {
    this.router.navigate(['/login-restaurant'])
  }

  loginClient() {
    this.router.navigate(['/login-client'])
  }
}
