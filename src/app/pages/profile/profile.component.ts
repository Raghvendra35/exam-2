import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{

 // user=null;
  username: any;
  user:any;
  constructor(private loginService:LoginService){}

  ngOnInit(): void 
  {

    console.log("profile.................");
    console.log(localStorage.getItem("username"));
    this.username=localStorage.getItem("username");

     this.getUserDetails(this.username);
  }
  getUserDetails(username:string)
  {
  this.loginService.getUserDetails(username).subscribe(data=>
    {
      console.log("UserDetails methd...................");
      
      console.log(data);
      this.user=data;
      console.log(this.user);
      
    })
  }
}
