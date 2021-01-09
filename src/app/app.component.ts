import { Component } from '@angular/core';


import { Post } from './posts/posts.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-stack-app';
  storgPost: Post[] = []

  onAddPost(post){
    this.storgPost.push(post)
  }
}
