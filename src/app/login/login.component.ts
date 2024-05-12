import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  flag:boolean = false;
  apiError:string=''
  //bulid the login form
  login:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)])
  })

  handleLogin(login:FormGroup){
    this.flag = true
    this._AuthService.login(login.value).subscribe({
      next:(response)=>{
        this.flag = false
        localStorage.setItem('userLoginToken',response.token);
        this._AuthService.decodeUserInfo();
        this._Router.navigate(['/home']);
        console.log(response)
      },
      error:(err)=>{
        this.flag = false;
        console.log(err.error.msg);
        this.apiError = err.error.msg
      }
    })
    // console.log(login.value);
    
  }
}
