import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-component',
 imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
 registerForm: FormGroup;
  role: 'admin' | 'taxPayer' = 'admin';
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    console.log("registerrrrrrrrrrr")

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.role, Validators.required]
    });
  }

    setRole(role: 'admin' | 'taxPayer') {
    this.role = role;
    this.registerForm.patchValue({ role: role });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // if (this.registerForm.invalid) {
    //   this.errorMessage = "Please fill all fields correctly.";
    //   return;
    // }

    // this.loading = true;
    // this.errorMessage = '';

    // this.auth.register(this.registerForm.value).subscribe({
    //   next: (response) => {
    //     console.log("Registered!", response);

    //     // Redirect to login
    //     this.router.navigate(['auth/login']);
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.errorMessage = err.error?.message || 'Registration failed!';
    //   }
    // });
  }
}
