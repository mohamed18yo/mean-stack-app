


import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { authResData, AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) { }
  private authRes: Subscription;
  errorMsg: any
  isLoading = false
  isLoginMode = true

  ngOnInit() {


  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (form.invalid) {
      return
    }
    if (this.isLoginMode) {
      this.isLoading = true
      this.authService.login(form.value.email, form.value.password)
    } else {
      this.authService.createUser(form.value.email, form.value.password)
      this.isLoading = true
      this.isLoginMode = true
    }
    this.isLoading = false
    this.errorMsg = this.authService.getMessage().subscribe((msg) => {
      console.log("error Message : " + msg);
    })


  }


  onChangeMode() {
    this.isLoginMode = !this.isLoginMode
  }


  ngOnDestroy() {

  }
}
