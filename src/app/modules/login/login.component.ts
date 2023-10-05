import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  constructor(private readonly auth: AngularFireAuth) {}

  loginForm = new FormGroup({
    formEmail: new FormControl('', Validators.required),
    formPassword: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.loginForm) {
      const email = this.loginForm.get('formEmail')?.value;
      const password = this.loginForm.get('formPassword')?.value;
      console.log(email, password);

      this.auth.signInWithEmailAndPassword(email as string, password as string).then(() => console.log('You are logged in'));
    }
  }
}
