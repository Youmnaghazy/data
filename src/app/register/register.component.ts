import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private _AuthService:AuthService, private _Router:Router){

  }

  status:boolean = false;

  // form declare
  signUp:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required , Validators.email]),
    password:new FormControl(null,[Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{8,16}$/)]),
    age:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  })

  //handle signup
  handleSignup(signUp:FormGroup){
    this.status = true;
    this._AuthService.signup(signUp.value).subscribe({
      next:(response)=>{
       if(response.msg == 'done'){
        this.status = false;
        this._Router.navigate(['/login']);
       }
        // console.log(response)
      },
      error:(err)=>{
        this.status = false;
        console.log(err)
      }
    })
  }

  
}
