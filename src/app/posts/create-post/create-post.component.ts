import { Component, OnInit } from "@angular/core";
import { Post } from "../posts.model";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import {mimeType} from './mime-type.validator'


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})


export class CreatePostComponent implements OnInit {
  private mode = "create";
  post: Post;
  imagePreview: any;
  private postId: string;
  isLoading = false
  form: FormGroup
  constructor(public postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null,  {validators:[Validators.required],
        asyncValidators:[mimeType]
      } )
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId')
        this.isLoading = true
        this.post = this.postService.getPost(this.postId)
        this.form.setValue({
          title: this.post.title,
          content: this.post.content
        })
        this.isLoading = false
      } else {
        this.mode = 'create',
          this.postId = null
      }
    })
  }
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload= ()=>{

      this.imagePreview = reader.result ;

    }
    reader.readAsDataURL(file)
    // console.log(file);
    // console.log(this.form);


  }

  onSavePost() {

    if (this.form.invalid) {
      return
    }
    this.isLoading = true;

    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
        )
    } else {
      this.postService.editPost(this.postId, this.form.value.title, this.form.value.content)
    }

    this.form.reset();
  }
}
