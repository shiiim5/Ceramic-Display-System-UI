import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-register-component',
 imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
 registerForm: FormGroup;
  role: 0 | 1 =0;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) {
    console.log("registerrrrrrrrrrr")

    this.registerForm = this.fb.group({
      username: ['', [Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      address:[''],
      role: [this.role, Validators.required]
    },
    { validators: this.passwordMatchValidator } );
  }

    setRole(role: 'admin' | 'seller') {
      if (role === 'admin') {
        this.role = 0;
      } else {
        this.role = 1;
      }
    this.registerForm.patchValue({ role: this.role });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}


  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Please fill all fields correctly.";
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log("Registered!", response);

        // Redirect to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed!';
      }
    });
  }
}
