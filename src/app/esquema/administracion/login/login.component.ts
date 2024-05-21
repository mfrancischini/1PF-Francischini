import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginActions } from './store/login.actions';
import { loginUser } from './store/login.selectors';
import { IUsuario } from '../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  username: string | undefined;
  password: string | undefined;

  loginSuscription?: Subscription;    
  constructor(private fb: FormBuilder, private loguin:LoginService,private router: Router,
    private store: Store
  ) {
    this.loginForm = this.fb.group({ 
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.loginSuscription?.unsubscribe();
  }

  ngOnInit(): void {
   this.loginSuscription = this.store.select(loginUser).subscribe({
      next: (user) => {
        if (user) {
       
          this.router.navigate(['alumnos']);
        }
      }
    });
  }
  


  login() {
 
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
     this.store.dispatch(loginActions.login({data: this.loginForm.getRawValue()}));
    }
  }

  logout(): void {
    this.store.dispatch(loginActions.logout());
  //  this.loguin.logout();
  }
}
function next(value: IUsuario | null): void {
  throw new Error('Function not implemented.');
}

