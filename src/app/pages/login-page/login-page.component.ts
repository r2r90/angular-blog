import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router: Router = inject(Router);
  isPasswordVisible = signal<boolean>(false);
  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })


  onSubmit(e: Event) {
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((res: Response) => {
        this.router.navigate(['']);
      })
    }
  }
}
