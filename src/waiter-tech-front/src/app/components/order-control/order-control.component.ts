import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-order-control',
  templateUrl: './order-control.component.html',
  styleUrls: ['./order-control.component.css']
})
export class OrderControlComponent {
  userID: any
  orders: {
    board: number
    value: string
    ID: number
    dishes: {
      dish: string
      obs: string
      quantity: number
    }[]
  }[] = []

  modalInfos: {
    dish: string
    obs: string
    quantity: number
  }[] = []

  timer: any
  timing: any = 10000
  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2) { }

  goBack() {
    this.router.navigate(['home-restaurant'])
  }

  async ngOnInit() {
    const alert = document.getElementById('alert') as HTMLElement
    if (alert != undefined) {
      alert.hidden = true
    }
    this.startTimer()

    this.userID = localStorage.getItem('id')
    if (this.userID === null) {
      alert.hidden = false
      await new Promise(time => setTimeout(time, 4000))
      this.router.navigate(['login-restaurant'])
    }

    else {
      this.http.post(`${route}/getItensData`, { id: this.userID }).subscribe((msg: any) => {
        for (let i = 0; i < msg.length; i++) {
          this.orders.push(msg[i])
        }
      })
    }
  }

  async concludeItem(id: any) {
    clearTimeout(this.timer)
    this.http.post(`${route}/removeDishControl`,
      {
        idRestaurant: localStorage.getItem('id'),
        board: id
      }).subscribe(() => {
        window.location.reload()
      })
  }

  modal(order: any) {
    this.modalInfos = []
    for (let i = 0; i < order.dishes.length; i++) {
      if (order.dishes[i].obs != '') {
        this.modalInfos.push(order.dishes[i])
      }
    }
    clearTimeout(this.timer)
  }

  haveObs(obs: any) {
    if (obs) {
      return true
    }
    else {
      return false
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timer)
  }

  startTimer() {
    this.timer = setTimeout(() => {
      window.location.reload()
    }, this.timing)
  }

  resetTimer() {
    this.startTimer()
  }

}
