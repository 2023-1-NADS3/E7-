import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent {

  userID: any
  restaurantData: {
    photo: string;
    restaurantName: string;
    name: string;
    email: string;
    contact: string;
    address: string;
    time: string;
  } = {
      photo: '',
      restaurantName: '',
      name: '',
      email: '',
      contact: '',
      address: '',
      time: ''
    }

  constructor(private router: Router, private http: HttpClient) { }

  async ngOnInit() {
    this.userID = localStorage.getItem('id')
    if (this.userID === null) {
      alert('Você não está logado!!!')
      this.router.navigate(['login-restaurant'])
    }
    else {
      this.http.post(`${route}/getRestaurantData`, { id: this.userID }).subscribe(
        (msg: any) => {
          this.restaurantData.restaurantName = msg.restaurant_name
          this.restaurantData.name = msg.restaurant_name
          this.restaurantData.email = msg.email
          this.restaurantData.contact = msg.contact.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
          this.restaurantData.address = msg.address
          this.restaurantData.time = msg.time
          this.restaurantData.photo = `https://drive.google.com/uc?export=view&id=${msg.image}`
        })
    }
  }

  goBack() {
    this.router.navigate(['home-restaurant'])
  }

  editRoute() {
    this.router.navigate(['option-edit'])
  }

  logout() {
    localStorage.removeItem('id')
    this.router.navigate(['login-restaurant'])
  }
}
