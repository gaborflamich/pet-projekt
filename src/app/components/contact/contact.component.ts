import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule, Validators, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  signupForm!: FormGroup;
  genders: string[] = ['male', 'female'];
  forbiddenUsernames: string[] = ['admin', 'root'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          this.forbiddenNames.bind(this),
          this.cannotContainSpace.bind(this),
          this.cannotContainUppercase.bind(this),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(32),
          this.passwordValidatorNumber,
          this.passwordValidatorUppercase,
          this.passwordValidatorLowercase,
          this.passwordValidatorSpec,
        ]),
        confirmPassword: new FormControl('', Validators.compose([Validators.required, this.passwordMatchValidator])),
      }),
      gender: new FormControl('male'),
      privacy: new FormControl('', Validators.required),
      hobbies: new FormArray([]),
    });

    // this.signupForm.get('userData.password')?.valueChanges.subscribe(() => {
    //   this.signupForm.get('userData.confirmPassword')?.updateValueAndValidity();
    // });
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(this.signupForm.get('userData.confirmPassword'));
    // });
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('userData.username');
  }
  get email(): AbstractControl | null {
    return this.signupForm.get('userData.email');
  }
  get password(): AbstractControl | null {
    return this.signupForm.get('userData.password');
  }
  get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('userData.confirmPassword');
  }
  get gender(): AbstractControl | null {
    return this.signupForm.get('gender');
  }
  get privacy(): AbstractControl | null {
    return this.signupForm.get('privacy');
  }

  onSubmit(): void {
    console.log(this.signupForm);
  }

  getControls(): AbstractControl[] | null {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): ValidationErrors | null {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // Async validator
  // eslint-disable-next-line rxjs/finnish
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise$ = new Promise<any>((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsforbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise$;
  }

  cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  cannotContainUppercase(control: AbstractControl): ValidationErrors | null {
    const username = control.value as string;
    if (/[A-Z]/.test(username)) {
      return { containsUppercase: true };
    }
    return null;
  }

  // Password validation

  passwordValidatorNumber: ValidatorFn = (control: AbstractControl) => {
    const password = control.value as string;
    const hasNumber = /\d/.test(password);
    const valid = hasNumber;
    return valid ? null : { passwordContainsNumber: true };
  };

  passwordValidatorUppercase: ValidatorFn = (control: AbstractControl) => {
    const password = control.value as string;
    const hasUppercase = /[A-Z]/.test(password);
    const valid = hasUppercase;
    return valid ? null : { passwordContainsUppercase: true };
  };

  passwordValidatorLowercase: ValidatorFn = (control: AbstractControl) => {
    const password = control.value as string;
    const hasLowercase = /[a-z]/.test(password);
    const valid = hasLowercase;
    return valid ? null : { passwordContainsLowercase: true };
  };

  passwordValidatorSpec: ValidatorFn = (control: AbstractControl) => {
    const password = control.value as string;
    const hasSpecialChar = /[!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/.test(password);
    const valid = hasSpecialChar;
    return valid ? null : { passwordContainsSpecChar: true };
  };

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      // Clear the error if passwords match
      if (password === confirmPassword) {
        return null;
      }
    }
    // Set the error if passwords don't match
    return { passwordMismatch: true };
  };
}
