import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {HomeComponent} from "./home";
import {SettingComponent} from "./setting/setting.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {MainComponent} from "./main/main.component";
import {CommentComponent} from "./comment/comment.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'createPost', component: CreatePostComponent},
  {path: 'mainPage', component: MainComponent},
  {path: 'mainPage/:id', component: CommentComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
