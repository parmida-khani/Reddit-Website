import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SignUpModel} from '../models';
import {SendRequestService} from './send-request.service';

@Injectable({
  providedIn: 'root',
})
export class FetchUserDataService {
  constructor(private http: HttpClient) {
  }

  public signUpSubmit(user: SignUpModel) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      }),
    };
    return this.http.post<any>(
      'http://localhost:8000/user/signup',
      JSON.stringify(user),
      options
    );
  }

  public changeUser(user: SignUpModel) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      }),
    };
    const userStr:string | null = localStorage.getItem('user');
    let username;
    if (typeof userStr === "string") {
      username = JSON.parse(userStr).username;
    }
    return this.http.put<any>(
      `http://localhost:8000/user/setting/${username}`,
      JSON.stringify(user),
      options
    );
  }

  public signInSubmit<T>(user: T) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      }),
    };
    return this.http.post<any>(
      'http://localhost:8000/user/signin',
      JSON.stringify(user),
      options
    );
  }

}
