import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-component',
   imports: [ReactiveFormsModule, NgIf,RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
loginForm: FormGroup;
   errorMessage = '';

  constructor(private fb: FormBuilder,private authService:AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

    get f() {
    return this.loginForm.controls;
  }

 onSubmit() {
  if (this.loginForm.invalid) {
    this.errorMessage = "*Please fill all fields correctly.";
    return;
  }

  this.authService.login(this.loginForm.value).subscribe(
    (res: any) => {

      localStorage.setItem("token", res.data.accessToken);

     if(res.data.roles[0]="admin"){
       this.router.navigate(['/product']);
        
     }else{
       this.router.navigate(['']);
     }
    },
    (err) => {
      this.errorMessage = "*Invalid login credentials";
    }
  );
}

}
