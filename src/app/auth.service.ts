import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable ,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo = new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient,private _Router:Router) { 
    if(localStorage.getItem('userLoginToken')!==null){
      this.decodeUserInfo();
   }else{
     this._Router.navigate(['/login'])
   }
   setTimeout(()=>{
     this.logout();
   },300000)
  }

  

  decodeUserInfo(){
    let encode = JSON.stringify(localStorage.getItem('userLoginToken'));
    let decode:any = jwtDecode(encode);
    this.userInfo.next(decode); 
    console.log(decode);
  }
  
  signup(data:object):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',data)
  }

  login(data:object):Observable<any>{
    return this._HttpClient.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',data)
  }

  logout(){
    localStorage.removeItem('userLoginToken');
    this.userInfo.next(null);
    this._Router.navigate(['/login']);
  }
  
}
