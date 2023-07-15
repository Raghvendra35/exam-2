import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


  //Generate token
  public generateToken(loginData: any)
  {
      return this.http.post(`${baseUrl}/generate-token`,loginData);
  }


  //Store token in local storage
  //Login User: Set token in local storage
  public loginUser(token: string)
  {
    localStorage.setItem("token",token);
    return true;
  }

  // Check user is login or not
  //if return true that's maen user is login
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null)
    {
      return false;
    }
    else{
      return true;
    }
  }

// Logout : remove token from local Storage
public logout()
{
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
}


//return token , this method will return token from local Storage
public getToken()
{
  return localStorage.getItem("token");
}

//and also store UserDetails in localstorage  for not hitting server again-2
//like username and password
public setuser(user)
{
                             //json to string
  localStorage.setItem("user",JSON.stringify(user));
}


//Get User Details
public getUser()
{
  let userStr=localStorage.getItem("user");
  if(userStr!=null) //user is  not null
  {
   return JSON.stringify(userStr);
  }else
  {
  //if user Details is not on local Storage then logout user
    this.logout();
    return null;
   }
  }


  //Get User roles or Authority of user
  public getUserRole()
  {
    let user=this.getUser();
  //  return user.authorities[0].Authority;
  }
}

