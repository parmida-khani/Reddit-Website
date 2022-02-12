import {Component} from '@angular/core';
import {FetchUserDataService} from '../services/fetch-user-data.service';
import {SignInModel} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public email: string = '';
  public password: string = '';
  public username: string = '';

  constructor(
    private fetchDataService: FetchUserDataService,
    private router: Router
  ) {
  }

  public login(formValues: any) {
      const user: SignInModel = {
        username: formValues.username,
        email: formValues.email,
        password: formValues.password,
      };
      this.fetchDataService.signInSubmit(user).subscribe(

        async (result) => {
          console.log(user);

          console.log(result);
          localStorage.setItem('user', JSON.stringify(user));
          await this.router.navigateByUrl('/mainPage');
        },
        (response) => {
          alert(response.error.error);
        }
      );
  }
}
