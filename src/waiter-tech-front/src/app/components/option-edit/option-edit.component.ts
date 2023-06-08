import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-option-edit',
  templateUrl: './option-edit.component.html',
  styleUrls: ['./option-edit.component.css']
})
export class OptionEditComponent {

  constructor(private router: Router, private http: HttpClient) { }

  restaurantPhoto = ''

  changeImage(event: Event) {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files

    if (files && files[0]) {
      const foto = files[0]
      const formData = new FormData()
      formData.append('image', foto)
      this.http.post(`${route}/savePhoto`, formData).subscribe((msg: any) => {
        this.http.post(`${route}/changePhoto`, { idRestaurant: localStorage.getItem('id'), idPhoto: msg }).subscribe((response: any) => {
          if (response === true) {
            this.router.navigate(['option'])
          }
        })
      });
    }
  }

  userID: any
  nameRestaurant: any
  restaurantData: {
    id: string
    photo: string;
    restaurantName: string;
    email: string;
    contact: string;
    address: string;
    time: string;
  } = {
      id: localStorage.getItem('id') || '',
      photo: '-',
      restaurantName: '',
      email: '',
      contact: '',
      address: '',
      time: ''
    }

  async ngOnInit() {
    const alert = document.getElementById('alert') as HTMLElement
    const errorEdit = document.getElementById('errorEdit') as HTMLElement
    if (alert != undefined) {
      alert.hidden = true
    }

    if (errorEdit != undefined) {
      errorEdit.hidden = true
    }

    this.userID = localStorage.getItem('id')
    if (this.userID === null) {
      alert.hidden = false
      await new Promise(time => setTimeout(time, 4000))
      this.router.navigate(['login-restaurant'])
    }
    else {
      this.http.post(`${route}/getRestaurantData`, { id: this.userID }).subscribe(
        (msg: any) => {
          this.nameRestaurant = msg.restaurant_name
          this.restaurantPhoto = `https://drive.google.com/uc?export=view&id=${msg.image}`
        })
    }
  }

  goBack() {
    this.router.navigate(['option'])
  }

  async updateData() {
    this.http.post(`${route}/updateData`, { restaurantData: this.restaurantData }).subscribe(
      async (msg) => {
        if (typeof msg === 'object') {
          const errorEdit = document.getElementById('errorEdit') as HTMLElement
          errorEdit.hidden = false
          await new Promise(time => setTimeout(time, 4000))
          errorEdit.hidden = true
        }
        else {
          this.router.navigate(['option'])
        }
      })
  }

  handlePhone = (event: Event) => {
    let input = event.target as HTMLInputElement;
    input.value = this.phoneMask(input.value);
  };

  phoneMask = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };


}

