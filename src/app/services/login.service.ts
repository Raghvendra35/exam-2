import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  constructor(private http: HttpClient) { }





  //Current user:  which is loggedin normal or admin
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/api/current-user`);
  }




  //Generate token
  public generateToken(loginData: any)
  {
      return this.http.post(`${baseUrl}/api/generate-token`,loginData);
  }

//Get User Details which is login
public getUserDetails(username:String)
{
  return this.http.get(`${baseUrl}/api/username/${username}`);
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
  localStorage.removeItem("role");
  return true;
}




//return token , this method will return token from local Storage
public getToken()
{
  return localStorage.getItem("token");
}



// Set Role in local storage
public setRole(role: string)
{
   localStorage.setItem("role", role);
}

public getRole()
{
  return localStorage.getItem("role");
}



//and also store UserDetails in localstorage  for not hitting server again-2
//like username and password
public setUser(user)
{
                             //json to string
  localStorage.setItem("user",JSON.stringify(user));
// localStorage.setItem("user",user);
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

//Set username
public setUsername(username: string)
{
   localStorage.setItem("username", username);
}
//Get username from localstorage
public getUsername()
{
  return localStorage.getItem("username");
}

}

