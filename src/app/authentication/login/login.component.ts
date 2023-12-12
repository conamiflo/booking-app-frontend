import {Component, NgModule} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AuthResponse} from "../model/auth-response.model";
import {Login} from "../model/login.model";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent {
  constructor(private authService: AuthService,
              private router: Router) {

  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  onSubmit(): void {
    console.log(this.loginForm.value.username);
    console.log("Uslo");
    if(this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.username || "",
        password: this.loginForm.value.password || ""
      }
      console.log("drugo");
      console.log(login.email);
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          localStorage.setItem('user', response.token);
          console.log(response.token);
          this.authService.setUser()
          this.router.navigate([''])
        }
      })
    }

  }
}

