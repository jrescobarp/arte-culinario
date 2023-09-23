import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from "../../models"
import { ApiService  } from '../../api.service'

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  @Input() user: any;
  @Output() logInChange: EventEmitter<any> = new EventEmitter<any>();
  loggedIn = false;
  userInfo: User;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if(this.user){
      this.updateUserInfo();
    }
  }


  updateUserInfo(){
    this.user.subscribe((userInfo:any) => {
    if(userInfo){
      this.loggedIn =true;
      this.userInfo = userInfo;
    }
    });
  }

  updateloginStatus($event:any){
    this.loggedIn = !this.loggedIn;
    this.userInfo = JSON.parse($event);
    this.logInChange.emit($event);
  }

  logout(){
    this.apiService.logout().subscribe(result =>{
      this.userInfo = result;
      this.loggedIn = false;
    });
  }

}
