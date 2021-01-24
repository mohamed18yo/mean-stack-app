import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


import { Post } from './posts/posts.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService){}
  title = 'mean-stack-app';
  storgPost: Post[] = []

  onAddPost(post){
    this.storgPost.push(post)
  }
  ngOnInit(){
    this.authService.autoAuth()

  }
}
