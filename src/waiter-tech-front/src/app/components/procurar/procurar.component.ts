import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-procurar',
  templateUrl: './procurar.component.html',
  styleUrls: ['./procurar.component.css']
})
export class ProcurarComponent {
  constructor(private router: Router, private http: HttpClient) { }

  search: any
  restaurants:
    {
      restaurant_name: string,
      image: string,
      contact: string,
      ID: number
    }[] = []


  async searchFunction() {
    this.restaurants = []
    this.http.post(`${route}/searchRestaurants`, { search: this.search }).subscribe((msg: any) => {
      for (let i = 0; i < msg.length; i++) {
        msg[i].image = `https://drive.google.com/uc?export=view&id=${msg[i].image}`
        msg[i].contact = msg[i].contact.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')
        this.restaurants.push(msg[i])
      }
    })
  }
  goLocal(id: any) {
    this.router.navigate(['/localizacao'], { queryParams: { id: id } })
  }

  goBack() {
    this.router.navigate(['/login-client'])
  }
}
