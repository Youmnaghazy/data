import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private _AuthService:AuthService){}

  flag:boolean=false

  check(){
    this._AuthService.userInfo.subscribe({
      next:()=>{
        if(this._AuthService.userInfo.getValue()!=null){
          this.flag = true;
        }else{
          this.flag = false;
        }
      }
    })
  }

  logout(){
    this._AuthService.logout();
  }

  ngOnInit(): void {
    this.check();
  }

}
