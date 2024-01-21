import {Component, NgModule} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AuthResponse} from "../model/auth-response.model";
import {Login} from "../model/login.model";
import {WebSocketService} from "../../notifications/websocket.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent {
  constructor(private authService: AuthService,
              private router: Router, private webSocketService: WebSocketService) {

  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  onSubmit(): void {
    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          this.authService.setUser()
          this.webSocketService.openSocket();
          this.router.navigate([''])
        },
        error: (error: any) => {
          alert("Invalid account information! ")
        }
      })
    }

  }
}

