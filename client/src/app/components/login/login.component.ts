import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../models"
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  newUser: User = {
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

  constructor(private apiService: ApiService) {}

  registerUser(){
    console.log("Registering: ", this.newUser);
    this.apiService.registerUser(this.newUser);
    console.log("Registered: ", this.newUser);

  }

}
