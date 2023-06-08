import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  dishes: {
    ID: number,
    id_restaurant: number,
    dish_name: string,
    description: string,
    image: string,
    price: number,
    activated: number
  }[] = []

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.http.post(`${route}/getMenuData`, { category: params['type'], id_restaurant: localStorage.getItem('idRestaurant') }).subscribe((msg: any) => {
        for (let i = 0; i < msg.length; i++) {
          if (msg[i].activated) {
            msg[i].image = `https://drive.google.com/uc?export=view&id=${msg[i].image}`
            this.dishes.push(msg[i])
          }
        }
      })
    })
  }


  goBack() {
    this.router.navigate(['/home'])
  }

  goCart() {
    this.router.navigate(['/cart'])
  }

  goDetails(dish: any) {
    this.router.navigate(['/details'], { queryParams: { dish: JSON.stringify(dish) } })
  }

}
