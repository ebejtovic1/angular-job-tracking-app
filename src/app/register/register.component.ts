import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../app.component.css']
})
export class RegisterComponent implements OnInit {
  isLogin = true;

  form = new FormGroup({
    name: new FormControl('',),
    email: new FormControl('',[
      Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private toast: ToastrService, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.isLogin){
      if(this.form.valid){
        const loginData = {
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value
        }
        this.userService.login(loginData);
      }
      else{
        this.toast.error("Please Fill Out All Fields");
      }

    }
    else{
      if(this.form.valid && this.form.controls['name'].value!==''){
        const registerData = {
          name: this.form.controls['name'].value,
          email: this.form.controls['email'].value,
          password: this.form.controls['password'].value
        }
        this.userService.register(registerData);
      }
      else{
        this.toast.error("Please Fill Out All Fields");
      }

    }

  }

}
