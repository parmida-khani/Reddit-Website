import { Component, OnInit } from '@angular/core';
import {PostModel} from "../models";
import {FetchPostDataService} from "../services/fetch-post-data.service";
import {from} from "rxjs";
import {FetchUserDataService} from "../services/fetch-user-data.service";
import {SendRequestService} from "../services/send-request.service";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sort:string="new";
  public sortByDate:string="publishDate";
  public sortByLikes:string="numOfLikes";
  public sortByComments:string="numOfComments";
  public posts: PostModel[] = [];

  constructor(private fetchPostDataService: FetchPostDataService) { }

  ngOnInit(): void {
    this.getPosts(this.sortByDate);
  }

  public async getPosts(sortBy:String) {
    const posts = await SendRequestService.sendRequest(
      `http://localhost:8000/posts/getPosts/?sort=${sortBy}`,
      true
    );
    this.posts=posts;
  }


  likeClick() {
    this.getPosts(this.sortByLikes);
    if (this.sort === 'like')
      return;
    // @ts-ignore
    document.getElementById('like').classList.add('selected');
    // @ts-ignore
    document.getElementById('new').classList.remove('selected');
    // @ts-ignore
    document.getElementById('comment').classList.remove('selected');
    this.sort = 'like';
  }

  commentClick() {
    this.getPosts(this.sortByComments);

    if (this.sort === 'comment')
      return;
    // @ts-ignore
    document.getElementById('comment').classList.add('selected');
    // @ts-ignore
    document.getElementById('new').classList.remove('selected');
    // @ts-ignore
    document.getElementById('like').classList.remove('selected');
    this.sort = 'comment';

  }

  newClick() {
    this.getPosts(this.sortByDate);

    if (this.sort === 'new')
      return;
    // @ts-ignore
    document.getElementById('new').classList.add('selected');
    // @ts-ignore
    document.getElementById('comment').classList.remove('selected');
    // @ts-ignore
    document.getElementById('like').classList.remove('selected');
    this.sort = 'new';

  }
}
