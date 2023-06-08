import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent {
  constructor(private router: Router, private http: HttpClient) { }
  idRestaurant: any

  async ngOnInit() {
    const alert = document.getElementById('alert') as HTMLElement
    if (alert != undefined) {
      alert.hidden = true
    }
  }

  goRestaurantPage() {
    this.http.post(`${route}/getRestaurantId`, { idRestaurant: this.idRestaurant }).subscribe(async (msg: any) => {
      if (msg) {
        localStorage.setItem('idRestaurant', this.idRestaurant)
        this.router.navigate(['/home'])
      }
      else {
        const alert = document.getElementById('alert') as HTMLElement
        alert.hidden = false
        await new Promise(time => setTimeout(time, 4000))
        alert.hidden = true
      }
    })
  }

  goBack() {
    this.router.navigate(['/login-client'])
  }
}
