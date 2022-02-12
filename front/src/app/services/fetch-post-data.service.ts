import { Injectable } from '@angular/core';
import {PostModel, SignUpModel} from "../models";
import {SendRequestService} from "./send-request.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FetchPostDataService {

  constructor(private http: HttpClient) { }



  public async getPost(id:String) {
    console.log(id)
    const post= await SendRequestService.sendRequest(
      `http://localhost:8000/posts/getPost/${id}`,
      true
    );
    console.log("post is: "+post);
    return post;
  }
}
