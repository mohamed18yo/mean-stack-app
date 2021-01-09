import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Post } from "./posts.model";
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = []
  private postsUpdate = new Subject<Post[]>()
  constructor(private http: HttpClient) { }
  getPost() {
    this.http.get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data;
        this.postsUpdate.next([...this.posts])
      })

  }
  getPostUpdate() {
    return this.postsUpdate.asObservable()
  }
  addPost(id: null , title: string, content: string) {
    const post: Post = {
      id: id, title: title, content: content
    }
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((res) => {
      console.log(res.message);
      this.posts.push(post)
      this.postsUpdate.next([...this.posts])
    })

  }

}
