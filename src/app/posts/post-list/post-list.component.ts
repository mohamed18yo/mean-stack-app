import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../posts.model";
import { PostService } from "../posts.service";



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(private postServis: PostService, private authService: AuthService) { }
  private postSub: Subscription;
  private authStatusSub: Subscription;
   isAuth= false
  isLoading = false;
  totalPost = 10
  postsPerPage = 5
  currentPage=1

  postSizeOptions = [1, 2, 5, 10]
  posts: Post[]=[]
  ngOnInit() {
    this.isLoading = true;
    this.postServis.getPosts(this.postsPerPage, this.currentPage);

    this.postServis.getPostUpdate().subscribe((postsData: Post[]) => {
      this.isLoading = false;
      this.posts = postsData

    })
    this.isAuth= this.authService.getAuth()
    this.authStatusSub= this.authService.getAuthStatusListner().subscribe(isAuthenticated=>{
      this.isAuth= isAuthenticated
    })

  }
  onDelete(postId: string) {
    this.postServis.deletePost(postId)
  }
  onChange(pageData: PageEvent){
    this.isLoading = true
    this.postsPerPage= pageData.pageSize
    this.currentPage= pageData.pageIndex+1
    this.postServis.getPosts(this.postsPerPage, this.currentPage);
  }
  ngOnDestroy() {
    // this.postSub.unsubscribe()
  }
}
