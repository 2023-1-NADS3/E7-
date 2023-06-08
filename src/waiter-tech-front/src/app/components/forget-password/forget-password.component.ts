import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private router: Router, private http: HttpClient) { }

  userEmail: string = ''

  checkEmail() {
    const message = document.getElementById('message') as HTMLElement
    if (this.userEmail === '') {
      if (message) {
        message.style.display = ''
      }
    }
    else {
      if (message) {
        message.style.display = 'none'
      }
      if (this.verifyMail(this.userEmail)) {
        this.http.post(`${route}/checkEmail`, { userEmail: this.userEmail }).subscribe(async (msg: any) => {
          console.log(msg)
          if (msg) {
            const success = document.getElementById('success') as HTMLElement
            if (success != undefined) {
              success.style.display = ''
              await new Promise(time => setTimeout(time, 4000))
              success.style.display = 'none'
              this.router.navigate(['/'])
            }
          }
          else {
            const failed = document.getElementById('failed') as HTMLElement
            if (failed != undefined) {
              failed.style.display = ''
              await new Promise(time => setTimeout(time, 4000))
              failed.style.display = 'none'
            }
          }
        })
      }
    }
  }

  goBack() {
    this.router.navigate(['/'])
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

}
