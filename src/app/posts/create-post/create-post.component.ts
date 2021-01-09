import { Component } from "@angular/core";
import { Post } from "../posts.model";
import { NgForm } from '@angular/forms'
import { PostService } from "../posts.service";



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(public postService: PostService){}

  onAddPost(form: NgForm) {
    if(form.invalid){ 
      return
    }
    this.postService.addPost(form.value.title, form.value.content)
    form.resetForm();
  }
}
