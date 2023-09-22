import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from "../../models"
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    tssci: false,
    comments: [],
    images: [],
    recipes: []
  };

  @Input() loginType!: string;
  @Output() logInChange: EventEmitter<any> = new EventEmitter<any>();


  constructor(private apiService: ApiService) {}

  registerUser(){
    this.apiService.registerUser(this.user).subscribe(result =>{
      console.log("RESULTRegister: ", result);
    });
  }

  login(){
    this.apiService.login(this.user).subscribe((result: any) =>{
      let userInfo = result;
      console.log("RESULTLogin: ", userInfo);
      this.logInChange.emit(userInfo);
    });
  }

}
