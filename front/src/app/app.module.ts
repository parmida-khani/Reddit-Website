import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FetchUserDataService} from "./services/fetch-user-data.service";
import { HomeComponent } from './home';
import { SettingComponent } from './setting/setting.component';
import {BackgroundComponent} from "./home/background/background.component";
import {HeaderComponent} from "./home/header/header.component";
import { MainComponent } from './main/main.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CardComponent } from './card/card.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    SettingComponent,
    BackgroundComponent,
    HeaderComponent,
    MainComponent,
    MainHeaderComponent,
    CreatePostComponent,
    CardComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FetchUserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
