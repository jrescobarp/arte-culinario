import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from "../../models"

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


  ngOnInit(): void {
    this.updateUserInfo();
  }


  updateUserInfo(){
    this.user.subscribe((userInfo:any) => {
      if(userInfo.username){
        this.loggedIn =true;
        this.userInfo = userInfo;
      }
    });
  }

  updateloginStatus($event:any){
    this.loggedIn = !this.loggedIn;
    this.logInChange.emit($event);
    console.log("USERMENU: ", $event);
    console.log("loggedIn: ", $event);
  }

}
