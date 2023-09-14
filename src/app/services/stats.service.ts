import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  token = '';
  httpOptions: any;
  url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit/';

  constructor(userService: UserService, private http: HttpClient) {
    this.token = userService.getUserToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  getStats(){
    return this.http.get(this.url + 'jobs/stats', this.httpOptions);
  }
}
