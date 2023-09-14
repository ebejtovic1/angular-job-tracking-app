import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {JobsService} from "../services/jobs.service";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css', '../app.component.css']
})
export class TypographyComponent implements OnInit {

  selectedJobType = 'full-time';
  status = 'pending';
  edit = false;
  selectedJob : any;


  form = new FormGroup({
    position: new FormControl('',[
      Validators.required]),
    company: new FormControl('',[
      Validators.required]),
    jobLocation: new FormControl('',[
      Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private jobsServise: JobsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.edit=true;
        this.jobsServise.getJobs({jobType: 'all', sort: 'latest', status: 'all'}).subscribe((data: any)=> {
          this.selectedJob = data?.jobs.find(obj => obj?._id === params['id']);
          console.log(this.selectedJob);
          this.form.controls['company'].setValue(this.selectedJob.company);
          this.form.controls['jobLocation'].setValue(this.selectedJob.jobLocation);
          this.form.controls['position'].setValue(this.selectedJob.position);
          this.form.controls['status'].setValue(this.selectedJob.status);
          this.form.controls['jobType'].setValue(this.selectedJob.jobType);

        });
     } else {
        const user = this.userService.getUserFromLocalStorage();
        this.form.controls['jobLocation'].setValue(user.location);

      }
    });

  }
  submit(){
    if(!this.edit){
    if(this.form.valid) {
      this.jobsServise.addNewJob(this.form.value);
      this.clear();
    }
    else{
      this.toastr.error("Please Fill Out All Fields");
    }
    }
    else{
      if(this.form.valid) {
        this.jobsServise.updateJob(this?.selectedJob?._id,this.form.value).subscribe((data: any)=>{
          this.clear();
          this.toastr.success("Job Modified...", "success")

        });
      }
      else{
        this.toastr.error("Please Fill Out All Fields");
      }

    }

  }
  changeJobType(data:any){
    this.selectedJobType = data.target.value;

  }
  changeStatus(data:any){
    this.status = data.target.value;

  }
  clear(){
    this.form.controls['company'].setValue('');
    this.form.controls['position'].setValue('');

  }

}
