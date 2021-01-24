


import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  isLoading = false
  isLoginMode = true
  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (form.invalid) {
      return
    }

    if (this.isLoginMode) {
      this.isLoading= true
      this.authService.login(form.value.email, form.value.password)
    } else {
      this.authService.createUser(form.value.email, form.value.password)
      this.isLoading= true
      this.isLoginMode= true
    }
    this.isLoading= false


  }
  onChangeMode() {
    this.isLoginMode = !this.isLoginMode
  }
}
