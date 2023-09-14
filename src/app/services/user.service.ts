import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token = '';
  httpOptions: any;
  url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit/';
  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {
    this.token = this.getUserFromLocalStorage()?.token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  getUserFromLocalStorage(){
    const result = localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
  }
  getUserToken(){
    return this.token;
  }
  updateProfileData(data: any){
    return this.http.patch(this.url + 'auth/updateUser', data, this.httpOptions).subscribe((data: any)=>{
      this.toast.success("User Updated!");

        },
        error => {
      console.log(error);
        });
  }
  login(data: any){
    return this.http.post(this.url + 'auth/login', data).subscribe((data:any)=>{
      localStorage.setItem('user', JSON.stringify(data.user));
      this.token = this.getUserFromLocalStorage()?.token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + this.token
        })
      };
      this.router.navigate(['/dashboard']);
      this.toast.success("Welcome Back" + data.user.name);

    },error => {
      this.toast.error("Invalid Credentials");
    });

  }
  register(data: any){
    return this.http.post(this.url + 'auth/register', data).subscribe((data:any)=>{
      localStorage.setItem('user', JSON.stringify(data.user));
      this.token = this.getUserFromLocalStorage()?.token;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: 'Bearer ' + this.token
        })
      };
      this.router.navigate(['/dashboard']);
      this.toast.success("Hello There" + data.user.name);

    },error => {
      this.toast.error("Invalid Credentials");
    });

  }
}
