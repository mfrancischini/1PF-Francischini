import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  username: string | undefined;
  password: string | undefined;
  constructor(private fb: FormBuilder, private loguin:LoginService,private router: Router,
  ) {
    this.loginForm = this.fb.group({ 
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }



  login() {
 
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.loguin.login(this.loginForm.getRawValue());
    }
  }

  logout(): void {
    this.loguin.logout();
    // Redirige a la página de inicio de sesión u otras acciones después del cierre de sesión
  }
}
