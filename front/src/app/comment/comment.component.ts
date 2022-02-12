import { Component, OnInit } from '@angular/core';
import {commentModel, PostModel} from "../models";
import {ActivatedRoute} from "@angular/router";
import {FetchPostDataService} from "../services/fetch-post-data.service";
import {SendRequestService} from "../services/send-request.service";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public post!:PostModel;
  public comment:string = "";
  constructor(    private route: ActivatedRoute,
                  private fetchPostData: FetchPostDataService
  ) { }

  async ngOnInit() {
    this.post = await this.fetchPostData.getPost(this.route.snapshot.params['id']);
  }

  postComment(){

  }

  async addComment(formValues: any) {
    const userStr: string | null = localStorage.getItem('user');
    let user;
    if (typeof userStr === "string") {
      user = JSON.parse(userStr);
    }
    const comment: commentModel = {
      username: user.username,
      text: formValues.comment,
    };
    await SendRequestService.sendRequest(
      `http://localhost:8000/posts/addComment/${this.post._id}`,
      true,
      comment,true
    );
    this.post = await this.fetchPostData.getPost(this.route.snapshot.params['id']);
  }
}
