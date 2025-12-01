import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
   imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
loginForm: FormGroup;
   errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

    get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // if (this.loginForm.invalid) {
    //   this.errorMessage = "Please fill all fields correctly.";
    //   return;
    // }
    // if (this.loginForm.valid) {
    //   this.auth.login(this.loginForm.value).subscribe(
    //     (res) => console.log("Logged in!", res),
    //     (err) => console.log("Error", err)
    //   );
    //     this.router.navigate(['invoice/submit']);
    // }
  }
}
