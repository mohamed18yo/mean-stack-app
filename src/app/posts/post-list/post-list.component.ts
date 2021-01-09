import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../posts.model";
import { PostService } from "../posts.service";



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy {

  constructor(private postServis: PostService) { }
  private postSub: Subscription;
  posts: Post[] = [
    // {
    //   title: 'This First Post in this app hello world',
    //   content: 'some content to this post '
    // },
    // {
    //   title: 'This Sconde Post in this app hello world',
    //   content: 'some content to this post '
    // },
  ]
  ngOnInit() {
    this.postServis.getPost();
    this.postServis.getPostUpdate().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }
  ngOnDestroy() {
    this.postSub.unsubscribe()
  }
}
