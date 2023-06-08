import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  userID: any
  inputText = 'Selecionar imagem'
  constructor(private router: Router, private http: HttpClient) { }


  isPrato = false
  isBebida = false
  isSobremesa = false

  itemData = {
    idRestaurant: localStorage.getItem('id'),
    dishName: '',
    description: '',
    category: '',
    image: new FormData,
    imageURL: '',
    price: 0,
    activated: false
  }

  async ngOnInit() {
    const alert = document.getElementById('alert') as HTMLElement
    const success = document.getElementById('success') as HTMLElement
    if (alert != undefined) {
      alert.hidden = true
    }

    if (success != undefined) {
      success.hidden = true
    }

    this.userID = localStorage.getItem('id')
    if (this.userID === null) {
      alert.hidden = false
      await new Promise(time => setTimeout(time, 4000))
      this.router.navigate(['login-restaurant'])
    }
  }

  inputFile(event: Event) {
    this.itemData.image.delete('image')
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files

    if (files && files[0]) {
      const foto = files[0];
      this.inputText = foto.name
      this.itemData.image.append('image', foto)
    }
  }

  async addItem() {
    if (this.isPrato) {
      this.itemData.category = 'Prato'
    }
    if (this.isBebida) {
      this.itemData.category = 'Bebida'
    }
    if (this.isSobremesa) {
      this.itemData.category = 'Sobremesa'
    }
    if (this.itemData.dishName === '' || this.inputText === 'Selecionar imagem' || this.itemData.category === '' || this.itemData.price === 0) {
      const span = document.getElementById('span') as HTMLInputElement
      span.style.display = ''
    }
    else {
      this.http.post(`${route}/savePhoto`, this.itemData.image).subscribe((msg: any) => {
        this.itemData.imageURL = msg
        this.http.post(`${route}/addItemOnMenu`, this.itemData).subscribe(async (msg: any) => {
          if (msg) {
            const success = document.getElementById('success') as HTMLElement
            if (success != undefined) {
              success.hidden = false
              await new Promise(time => setTimeout(time, 4000))
              window.location.reload()
            }
          }
        })
      })
    }

  }

  goBack() {
    this.router.navigate(['/dishes'])
  }

}
