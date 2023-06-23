import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit
{
  
  constructor(){}
  
  public User={
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
   alert("Submit");
  }
}
