import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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


      constructor(private snack:MatSnackBar,private loginService: LoginService,
                  private router: Router){}


  ngOnInit(): void 
  {
    // throw new Error('Method not implemented.');
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
   
     console.log("Success........");
     console.log(data);
    console.log(data.token+" 1");
    console.log(data.role+" 2");
    
    
     
     
     

    //Login 
      this.loginService.loginUser(data.token);
      this.loginService.setRole(data.role);
      this.loginService.setUser(data.user);
      this.loginService.setUsername(data.username);
      console.log('login user..........................');
      console.log(data.username);
      
      
    

   

    //Comment this code because  current user method is not working line number 61 to 77
    // this.loginService.getCurrentUser().subscribe((user:any)=>
    //   {
    //     console.log("Inside login Component....................");
    //     console.log(user);
        
        
    //     this.loginService.setUser(user);
    //     console.log("user .....");
    //     console.log(user);

    //     //Redirect :: if Role is Admin then go Admin Dashboard 
    //     //Redirect :: if Role is Normal then redirect to normal user-Dashboard
    //     // 5
        
    //   })
    
    if(data.role=="Admin")
    {
      //Admin Dashboard
      // window.location.href='/admin' 
      this.router.navigate(['/admin']);     
    }else if(data.role=="Normal")
    {
     //User Dashboard
     this.router.navigate(['/user-dashboard']); 

    }else{
      this.loginService.logout();
      // window.location.href='/user-dashboard'
    
      
    }


     
      },
      (error)=>
      {
       console.log("Error ............");
       console.log(error);
       this.snack.open("Invalid Details !! Try again...",'',{
        duration: 3000,
       })
      })

  
   
  }
}
