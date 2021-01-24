


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  {path:'', component: PostListComponent},
  {path:'create', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path:'edit/:postId', component: CreatePostComponent , canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],   
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
