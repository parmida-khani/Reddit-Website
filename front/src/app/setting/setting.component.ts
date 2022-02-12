import { Component, OnInit } from '@angular/core';
import {SignUpModel} from "../models";
import {FetchUserDataService} from "../services/fetch-user-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public username: string = '';
  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (typeof userStr === "string") {
      const user:SignUpModel = JSON.parse(userStr);
      this.username = user.username;
      this.password = user.password;
      this.email = user.email;
    }
  }
  save(formValues: any) {
    const user: SignUpModel = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    this.fetchDataService.changeUser(user).subscribe(
      async (result) => {
        localStorage.setItem('user', JSON.stringify(user));
        await this.router.navigateByUrl('/mainPage');
      },
      (response) => {
        alert(response.error.error);
      }
    );
  }
}
