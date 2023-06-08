import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  constructor(private router: Router) { }

  findPageNavigate() {
    this.router.navigate(['procurar'])
  }

  codeRestaurant() {
    this.router.navigate(['qrcode'])
  }

  goBack() {
    this.router.navigate(['/'])
  }
}
