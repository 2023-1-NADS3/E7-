import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent {
  constructor(private router: Router, private http: HttpClient) { }

  userID: any
  dishs: {
    ID: number,
    dish_name: string,
    image: string
  }[] = []

  dishNameModal: any
  idDishModal: any

  async ngOnInit() {
    const alertLogin = document.getElementById('alertLogin') as HTMLElement
    if (alertLogin != undefined) {
      alertLogin.hidden = true
    }
    this.userID = localStorage.getItem('id')
    if (this.userID === null) {
      alertLogin.hidden = false
      await new Promise(time => setTimeout(time, 4000))
      this.router.navigate(['login-restaurant'])
    }
    else {
      this.http.post(`${route}/getDishesData`, { id: this.userID }).subscribe(async (msg: any) => {
        for (let i = 0; i < msg.length; i++) {
          msg[i].image = `https://drive.google.com/uc?export=view&id=${msg[i].image}`
          this.dishs.push(msg[i])
        }
      })
    }
  }

  getData(name: any, id: any) {
    this.dishNameModal = name
    this.idDishModal = id
  }

  async deleteDish(id: any) {
    this.http.post(`${route}/deleteDish`, { id: id }).subscribe(async (msg: any) => {
      window.location.reload()
    })
  }

  goAdd() {
    this.router.navigate(['/add-item'])
  }

  goEdit(id: any) {
    this.router.navigate(['/edit-item'], { queryParams: { id: id } })
  }

  goBack() {
    this.router.navigate(['/home-restaurant'])
  }
}
