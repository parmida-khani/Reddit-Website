import {Component} from '@angular/core';
import {FetchUserDataService} from '../services/fetch-user-data.service';
import {SignUpModel} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';

  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router
  ) {
  }

  register(formValues: any) {
    const user: SignUpModel = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };
    this.fetchDataService.signUpSubmit(user).subscribe(
      async (result) => {
        await this.router.navigateByUrl('/signIn');
      },
      (response) => {
        alert(response.error.error);
      }
    );
  }
}
