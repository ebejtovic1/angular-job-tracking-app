import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  token = '';
  httpOptions: any;
  url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit/';

  constructor(userService: UserService, private http: HttpClient, private toast: ToastrService) {
    this.token = userService.getUserToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'Bearer ' + this.token
      })
    };
  }

  deleteJob(id: any){
    delete this.httpOptions.params;
    return this.http.delete(this.url + 'jobs/'+id, this.httpOptions);
  }
  updateJob(id: any, data: any){
    delete this.httpOptions.params;
    return this.http.patch(this.url + 'jobs/'+id, data, this.httpOptions);
  }

  addNewJob(data: any){
    return this.http.post(this.url + 'jobs', data, this.httpOptions).subscribe((data: any)=>{
      this.toast.success("Job Created");
        },
        error => {
          console.log(error);
        });
  }
  getJobs(data: any){
    const options = this.httpOptions;
    if(data.search==="")delete data.search;
    data.page=1;
    options.params= data;
    return this.http.get(this.url + 'jobs', this.httpOptions);
  }
}
