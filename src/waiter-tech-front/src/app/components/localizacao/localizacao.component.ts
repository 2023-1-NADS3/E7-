import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})
export class LocalizacaoComponent {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  restaurantData: {
    photo: string;
    restaurantName: string;
    contact: string;
    address: string;
    time: string;
  } = {
      photo: '',
      restaurantName: '',
      contact: '',
      address: '',
      time: ''
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.http.post(`${route}/getRestaurantInfo`, { id: params['id'] }).subscribe((msg: any) => {
        this.restaurantData.photo = `https://drive.google.com/uc?export=view&id=${msg.image}`
        this.restaurantData.restaurantName = msg.restaurant_name
        this.restaurantData.contact = msg.contact.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
        this.restaurantData.address = msg.address
        this.restaurantData.time = msg.time
      })
    })
  }

  goBack() {
    this.router.navigate(['/procurar'])
  }

}
