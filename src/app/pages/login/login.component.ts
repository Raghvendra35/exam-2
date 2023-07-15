import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
 {

  //this is loginData is a object and when user will do login that username and password we store in usernam and password
    loginData={
      username:'',
      password: '',
      }


      constructor(private snack:MatSnackBar,private loginService: LoginService){}


  ngOnInit(): void 
  {
    throw new Error('Method not implemented.');
  }


  formSubmit()
  {
    console.log("login submit---------")
   //Validation 
   if(this.loginData.username.trim()=='' ||  this.loginData.username==null) 
   {
     this.snack.open("Username is required !!!",'',
     {
      duration:3000,
     })
     return;
   }

   if(this.loginData.password.trim()=='' || this.loginData.password==null)
   {
    this.snack.open("Password is required !!!",'',
    {
      duration:3000
    })
    return;
   }

   //Request to server to generate token
   this.loginService.generateToken(this.loginData).subscribe((data:any)=>{
   
     console.log("Success");
     console.log(data);
      },
      (error)=>
      {
       console.log("Error ............");
       console.log(error);
      })

  
   
  }
}
