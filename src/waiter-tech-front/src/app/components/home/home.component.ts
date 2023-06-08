import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  restaurantId: any
  restaurantName: any
  constructor(private router: Router, private http: HttpClient) { }

  async ngOnInit() {
    this.restaurantId = localStorage.getItem('idRestaurant')
    if (this.restaurantId === null) {
      this.router.navigate(['login-client'])
    }
    else {
      this.http.post(`${route}/getRestaurantName`, { id: this.restaurantId }).subscribe((msg: any) => {
        this.restaurantName = msg.restaurant_name
      })
    }
  }

  goDishes(type: any) {
    this.router.navigate(['/menu'], { queryParams: { type: type } })
  }

  goCart() {
    this.router.navigate(['cart'])
  }

  goBack() {
    this.router.navigate(['login-client'])
  }
}
