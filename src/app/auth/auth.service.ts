import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http"
import { authData } from "./auth-data.model"
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment"
import { error } from "protractor";

export interface authResData {
  token: any,
  expiresIn: number,
  message: string
}
const BACKEND_URL = environment.apiUrl + "/users"
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private authStatusListner = new Subject<boolean>();
  private messageErr = new Subject<string>();

  private isAuth = false;
  private tokenTimer: any
  constructor(private http: HttpClient, private router: Router) { }
  getMessage() {
    return this.messageErr
  }
  getToken() {
    return this.token
  }
  getAuthStatusListner() {
    return this.authStatusListner.asObservable();
  }

  getAuth() {
    return this.isAuth
  }
  createUser(email: string, password: string) {
    const user: authData = {
      email: email,
      password: password
    }
    this.http.post(BACKEND_URL + '/signup', user).subscribe(res => {
      // console.log(res);

    })
  }
  login(email: string, password: string) {
    const user: authData = {
      email: email,
      password: password
    }
    this.http.post<{ token: any, expiresIn: number, message: any }>(BACKEND_URL + '/login', user).subscribe(res => {
      const token = res.token;
      this.token = token
      if (token) {
        const expiresInDuration = res.expiresIn
        this.setAuthTimer(expiresInDuration)
        const now = new Date()
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)
        this.isAuth = true
        this.authStatusListner.next(true)
        // console.log('exDate' + expirationDate);
        this.saveAuthData(token, expirationDate)
        this.router.navigate(['/'])
      }
      // let msg = res.message
      // console.log(msg);

      // this.authErr.next(msg)

      // console.log('your token: '+ token);

    },
      error => {
        const msg = error.error.message
        this.messageErr.next(msg)
        // console.log(error.error.message);

      })
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.authStatusListner.next(false)
    this.clearAuthData()  //this.tokenTimer
    this.router.navigate(['/'])
  }
  private setAuthTimer(duration: number) {
    // console.log('setting timer: ' + duration);

    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }
  autoAuth() {
    const authInformation = this.getAuthData()
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    if (!authInformation) {
      return
    }
    // console.log(authInformation, expiresIn);

    if (expiresIn > 0) {
      this.token = authInformation.token
      this.isAuth = true
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListner.next(true)
      // console.log('hello from auto auth');

    }
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
  }
  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }

  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
  }

}

