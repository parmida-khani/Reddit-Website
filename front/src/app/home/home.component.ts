import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) {
  }

  async ngOnInit() {
    if (localStorage.length!==0) {
      await this.router.navigateByUrl("/user");
    }
  }

}
