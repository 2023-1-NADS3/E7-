import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  quantity: number = 1
  obs: string = ''
  dish: {
    ID: number,
    id_restaurant: number,
    dish_name: string,
    description: string,
    image: string,
    price: any,
  } = {
      ID: 0,
      id_restaurant: 0,
      dish_name: '',
      description: '',
      image: '',
      price: '',
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const item = JSON.parse(params['dish'])
      this.dish.ID = item.ID
      this.dish.id_restaurant = item.id_restaurant
      this.dish.dish_name = item.dish_name
      this.dish.description = item.description
      this.dish.image = item.image
      this.dish.price = item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    })
  }


  increaseAmount() {
    if (this.quantity < 10) {
      this.quantity++
    }
  }

  decreaseAmount() {
    if (this.quantity != 1) {
      this.quantity--
    }
  }

  goBack() {
    this.router.navigate(['/home'])
  }

  addToCart() {
    const cart = JSON.parse(localStorage.getItem('cartClient') || '[]')
    cart.push(
      {
        id_restaurant: this.dish.id_restaurant,
        dish: this.dish.dish_name,
        obs: this.obs,
        price: (this.dish.price.replace("R$", "").replace(".", "").replace(",", ".")) * this.quantity,
        quantity: this.quantity,
        image: this.dish.image
      }
    )
    localStorage.setItem('cartClient', JSON.stringify(cart))
    this.router.navigate(['/home'])
  }

}
