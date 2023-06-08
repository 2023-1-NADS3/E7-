import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private router: Router, private http: HttpClient) { }

  total: number | string = 0
  board: number = 1
  orders:
    {
      dish: string
      id_restaurant: number
      image: string
      obs: string
      price: any
      quantity: number
      position: number
    }[] = []

  ngOnInit() {
    const cart = JSON.parse(localStorage.getItem('cartClient') || '[]')
    for (let i = 0; i < cart.length; i++) {
      this.total += cart[i].price
      cart[i].price = cart[i].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      cart[i].position = i
      this.orders.push(cart[i])
    }
    this.total = this.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  removeItem(position: any) {
    const cart = JSON.parse(localStorage.getItem('cartClient') || '[]')
    cart.splice(position, 1)
    localStorage.setItem('cartClient', JSON.stringify(cart))
    window.location.reload()
  }

  order() {
    this.http.post(`${route}/makeAOrder`, { order: this.orders, board: this.board, total: this.total }).subscribe(msg => msg)
    localStorage.removeItem('cartClient')
    this.router.navigate(['/home'])
  }

  goBack() {
    this.router.navigate(['/home'])
  }
}
