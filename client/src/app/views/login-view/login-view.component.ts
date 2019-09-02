import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  public returnUrl: string;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute
            , private authenticationService: AuthenticationService) { }

  public ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    if (sessionStorage.getItem(('token'))) {
      // logout if session storage is still set.
      this.authenticationService.logout();
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this.authenticationService.login(this.loginForm.value.email)
      .pipe(take(1)).subscribe(() => this.router.navigate([this.returnUrl]), (error: any) => console.error(error));
  }

}
