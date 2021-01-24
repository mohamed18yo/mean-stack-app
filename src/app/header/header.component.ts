import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";




@Component({
  selector:'app-header',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']

})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuth= false;
  private authListnerSub:Subscription
  constructor( private authService: AuthService){}

  ngOnInit(){
    this.isAuth= this.authService.getAuth()
    this.authService.getAuthStatusListner().subscribe(res=>{
      this.isAuth= res
    })
  }
  onLogout(){
    this.authService.logout()
  }
  ngOnDestroy(){
    this.authListnerSub.unsubscribe()
  }
}
