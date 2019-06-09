import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient,
  	private cookie:CookieService,
  	public router: Router, ) { }


  apiUrl="http://localhost:8000/";

  client_id = "Rjh8v2aS4Tpin2i4sbcfNCgVSqDdaAZ4MOWuS4aV";
  grant_type = "password";

  login(username, password){
  	let tosend = new FormData();
  	tosend.append('username', username)
  	tosend.append('password', password)
  	tosend.append('client_id', this.client_id)
  	tosend.append('grant_type', this.grant_type)
  	return this.http.post(this.apiUrl+"auth/token/", tosend);
  }

  logout(){
  	this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  isLoggedIn(){
  	if (this.cookie.check('access_token')) {
  		return true;
  	}else{
  		return false;
  	}
  }

  getUserDetail(access_token){
    return this.http.get(this.apiUrl+"current?access_token="+access_token).subscribe((r:any)=>{
      if (r.id) {
        this.cookie.set("id",r.id,360000,"/");
        this.cookie.set("username",r.username,360000,"/");
        this.cookie.set("email",r.email,360000,"/");
        this.cookie.set("first_name",r.first_name,360000,"/");
        this.cookie.set("last_name",r.last_name,360000,"/");
        return true;
      }
      else{
      	return false;
      }
    }, (error:any)=>{
    	this.logout()
    	this.router.navigate(['/']);
    })
  }

  signup(username, email, first_name, last_name){
    let tosend = new FormData();
    tosend.append('username', username);
    tosend.append('email', email);
    tosend.append('first_name', first_name);
    tosend.append('last_name', last_name);
    // tosend.append('password', password);
    return this.http.post(this.apiUrl+"signup", tosend);
  }



  

  testService(){
  	console.log("Test SuccessFul");
  }
}
