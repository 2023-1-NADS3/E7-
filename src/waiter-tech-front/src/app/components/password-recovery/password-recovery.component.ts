import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { route } from 'src/app/app.component';
import { param } from 'jquery';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  password: string = ''

  newPassword() {
    const message = document.getElementById('message') as HTMLElement
    if (this.password === '') {
      if (message) {
        message.style.display = ''
      }
    }
    else {
      if (message) {
        message.style.display = 'none'
      }
      if (this.verifyPassword(this.password)) {
        this.route.queryParams.subscribe(params => {
          this.http.post(`${route}/newPassword`, { id: params['id'], password: this.password }).subscribe(async (msg: any) => {
            if (msg) {
              const success = document.getElementById('success') as HTMLElement
              if (success != undefined) {
                success.style.display = ''
                await new Promise(time => setTimeout(time, 4000))
                success.style.display = 'none'
                this.router.navigate(['/'])
              }
            }
          })
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
}
