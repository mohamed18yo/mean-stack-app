


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
    this.isLoading= true
    if (form.invalid) {
      return
    }
    if (this.isLoginMode) {
      this.isLoading = true
      this.authService.login(form.value.email, form.value.password)
      this.authService.getMessage().subscribe((msg)=>{
        this.errorMsg= msg
         console.log("error Message : "+ msg );
      })


    } else {
      this.authService.createUser(form.value.email, form.value.password)
      this.isLoading = true
      this.isLoginMode = true
    }
    this.isLoading = false



  }


  onChangeMode() {
    this.isLoginMode = !this.isLoginMode
  }


  ngOnDestroy() {

  }
}
