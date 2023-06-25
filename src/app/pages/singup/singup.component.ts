import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit
{
  
  constructor(private userService: UserService,
              private snack: MatSnackBar){}
  
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    
  }
  ngOnInit(): void {}

  formSubmit()
  {
   if(this.user.username=='' || this.user.username==null)
   {
    this.snack.open("Username is required !!",'',{
      duration:3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    })
   }
   //Validation others fields here
   

   this.userService.addUser(this.user).subscribe(
    (data:any)=>{
     //alert("Success");
     Swal.fire('Successfully done !!', 'User id is '+data.id,'success')
    },(error)=>
    {
     console.log(error);
   this.snack.open("Something went wrong !!", '',{
    duration:2000
   })   
 //  alert('failed');
    }
   )
  }
}
