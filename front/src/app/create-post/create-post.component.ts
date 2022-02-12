import {Component, Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostModel} from "../models";
import {FetchPostDataService} from "../services/fetch-post-data.service";
import {SendRequestService} from "../services/send-request.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  title: string="";
  communityName: string="SBU";
  text: string="";
  image: string | ArrayBuffer | null="";
  imageError: string="";
  isImageSaved: boolean=true;
  cardImageBase64: string="";
  mouseOverCreatePostForm:any;
  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private fetchPostDataService:FetchPostDataService
  ) {
  }

  async createPost(formValues: any) {
    const userStr: string | null = localStorage.getItem('user');
    let user;
    if (typeof userStr === "string") {
      user = JSON.parse(userStr);
    }
    const post: PostModel = {
      title: formValues.title,
      communityName: this.communityName,
      publisherUsername: user.username,
      text: formValues.text,
      // @ts-ignore
      image: this.image,
    };
    await SendRequestService.sendRequest(
      'http://localhost:8000/posts/createPost',
      true,
      post
    );
    await this.router.navigateByUrl("/mainPage")

  }

  addImage(event:any ) {
    const image=event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      this.image=reader.result;
    };
    reader.readAsDataURL(image);
  }


}
