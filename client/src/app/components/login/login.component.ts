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
    recipes: [],
    recipe_history: []
  };

  @Input() loginType!: string;
  @Output() logInChangeStatus: EventEmitter<any> = new EventEmitter<any>();


  constructor(private apiService: ApiService) {}

  registerUser(){
    this.apiService.registerUser(this.user).subscribe(result =>{
      this.logInChangeStatus.emit(result);
    });
  }

  login(){
    this.apiService.login(this.user).subscribe((result: any) =>{
      this.logInChangeStatus.emit(result);
    });
  }

}
