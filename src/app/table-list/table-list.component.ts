import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../services/jobs.service";
import { DatePipe } from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css', '../app.component.css']
})
export class TableListComponent implements OnInit {

  status = 'all';
  searched = '';
  selectedJobType = 'all';
  selectedSorting = 'latest';
  data: any;

  form = new FormGroup({
    search: new FormControl('',[Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    sort: new FormControl('', [Validators.required]),
  });

  constructor(private jobsService: JobsService, private  toase: ToastrService) { }

  ngOnInit() {
    this.form.controls['status'].setValue('all');
    this.form.controls['jobType'].setValue('all');
    this.form.controls['sort'].setValue('latest');
    this.jobsService.getJobs(this.form.value).subscribe((data:any)=>{
      this.data=data;
    });

  }

  submit(){
    this.form.controls['status'].setValue('all');
    this.form.controls['jobType'].setValue('all');
    this.form.controls['sort'].setValue('latest');
    this.form.controls['search'].setValue('');
    this.search();
  }
  searchChanged(data: any){
    this.form.controls['search'].setValue(this.searched);
    setTimeout(() => {
      this.search();
    }, 1000);
  }
  changeJobType(data:any){
    this.selectedJobType = data.target.value;
    this.search();
  }
  deleteJob(id: any){
    this.jobsService.deleteJob(id).subscribe((data: any)=>{
      this.toase.success("Success! Job Removed");
      this.jobsService.getJobs(this.form.value).subscribe((data:any)=>{
        this.data=data;
      });
    },error => {
      console.log("error");
    });
  }
  changeStatus(data:any){
    this.status = data.target.value;
    this.search();

  }
  search(){
    this.jobsService.getJobs(this.form.value).subscribe((data:any)=>{
      this.data=data;
    });
  }
  changeSorting(data: any){
    this.selectedSorting = data.target.value;
    this.search();
  }

}
