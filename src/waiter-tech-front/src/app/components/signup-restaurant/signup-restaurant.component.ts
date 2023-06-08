import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-signup-restaurant',
  templateUrl: './signup-restaurant.component.html',
  styleUrls: ['./signup-restaurant.component.css']
})
export class SignupRestaurantComponent {
  constructor(private router: Router, private http: HttpClient) { }

  userData = {
    restaurantName: '',
    email: '',
    cpf_cnpj: '',
    password: ''
  }

  ngOnInit() {
    const success = document.getElementById('success') as HTMLElement
    const idNumber = document.getElementById('idNumber') as HTMLElement
    const mailID = document.getElementById('mailID') as HTMLElement
    if (success != undefined && idNumber != undefined && mailID != undefined) {
      success.hidden = true
      idNumber.hidden = true
      mailID.hidden = true
    }
  }

  signUp() {
    if (this.userData.restaurantName === '' || this.userData.email === '' || this.userData.cpf_cnpj === '' || this.userData.password === '') {
      const message = document.getElementById('message') as HTMLElement

      if (message) {
        message.style.display = ''
      }
    }
    else {
      if (this.verifyPassword(this.userData.password) && this.verifyMail(this.userData.email)) {
        this.http.post(`${route}/createAccount`, this.userData).subscribe(async (msg: any) => {
          if (msg.status === true) {
            const success = document.getElementById('success') as HTMLElement
            if (success != undefined) {
              success.hidden = false
              await new Promise(time => setTimeout(time, 2000))
              success.hidden = true
            }
            this.router.navigate(['/login-restaurant'])
          }
          else {
            if (msg === 'cpf_cnpj') {
              const idNumber = document.getElementById('idNumber') as HTMLElement
              if (idNumber != undefined) {
                idNumber.hidden = false
                await new Promise(time => setTimeout(time, 8000))
                idNumber.hidden = true
              }
            }
            else if (msg === 'email') {
              const mailID = document.getElementById('mailID') as HTMLElement
              if (mailID != undefined) {
                mailID.hidden = false
                await new Promise(time => setTimeout(time, 8000))
                mailID.hidden = true
              }
            }
          }
        })
      }

    }
  }

  verifyPassword(password: string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const passwordMessage = document.getElementById('passwordMessage') as HTMLElement
    if (passwordRegex.test(password)) {
      if (passwordMessage) {
        passwordMessage.style.display = 'none'
      }
      return true
    } else {
      if (passwordMessage) {
        passwordMessage.style.display = ''
      }
      return false
    }
  }

  verifyMail(mail: string) {
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailMessage = document.getElementById('mailMessage') as HTMLElement
    if (mailRegex.test(mail)) {
      if (mailMessage) {
        mailMessage.style.display = 'none'
      }
      return true
    } else {
      if (mailMessage) {
        mailMessage.style.display = ''
      }
      return false
    }
  }

  goBack() {
    this.router.navigate(['/'])
  }
}
