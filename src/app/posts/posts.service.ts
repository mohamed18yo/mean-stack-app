import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators"
import { Post } from "./posts.model";
import { HttpClient } from '@angular/common/http'
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = []
  private postsUpdate = new Subject<Post[]>()
  constructor(private http: HttpClient, private router:Router) { }

  getPosts(postsPerPage:number, currentPage:number) {
    const queryParams= `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts'+ queryParams)
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe(transformedPost => {
        this.posts = transformedPost;
        this.postsUpdate.next([...this.posts])
      })

  }
  getPostUpdate() {
    return this.postsUpdate.asObservable()
  }

  addPost(title: string, content: string, image: File) {

    const postData= new FormData();
    postData.append('title', title)
    postData.append('content', content)
      postData.append('image', image, title)

    console.log(postData);

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', postData)
      .subscribe((res) => {
        const post: Post = {
          id: res.postId,
          title: title,
          content:content
        }
        const postid = res.postId
        post.id = postid
        console.log(res.message);
        this.posts.push(post)
        this.postsUpdate.next([...this.posts])
        this.router.navigate(['/'])
      })

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('post deleted');
        const updatePosts = this.posts.filter(post => post.id !== postId)
        this.posts = updatePosts
        this.postsUpdate.next([...this.posts])

      })
  }

  editPost(postId: string, title: string, content: string) {
    const updatedPost: Post = {
      id: postId, title: title, content: content
    }
    this.http.put('http://localhost:3000/api/posts/' + postId, updatedPost)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/'])
      })
  }
  getPost(id: string){
    return {...this.posts.find(p=> p.id === id )}
  }
}
