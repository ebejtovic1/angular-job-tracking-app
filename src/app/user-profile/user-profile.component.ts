import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css', '../app.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private toast: ToastrService) { }

  profileForm = new FormGroup({
    name: new FormControl('',[
        Validators.required]),
    lastName: new FormControl('',[
      Validators.required]),
    email: new FormControl('',[
      Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const user = this.userService.getUserFromLocalStorage();
    this.profileForm.controls['name'].setValue(user.name);
    this.profileForm.controls['lastName'].setValue(user.lastName);
    this.profileForm.controls['email'].setValue(user.email);
    this.profileForm.controls['location'].setValue(user.location);
  }

  submit(){
    if(this.profileForm.valid) {
      this.userService.updateProfileData(this.profileForm.value);
    }
    else{
      this.toast.error("Please Fill Out All Fields");

    }
  }

}
