import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from "../../models"
import { ApiService  } from '../../api.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {

  @Input() user: any;
  @Input() dropdownDisplay: boolean = false;
  @Output() logInChange: EventEmitter<any> = new EventEmitter<any>();
  loggedIn = false;
  userInfo: User;

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private _snackbar: MatSnackBar) {}

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
        localStorage.setItem("recipeHistory", JSON.stringify(this.userInfo.recipe_history));
        console.log("USERUSERUSER: ");
        console.log(this.userInfo);
      }
    });
  }

  updateloginStatus($event:any){
    this.loggedIn = !this.loggedIn;
    this.userInfo = JSON.parse($event);
    this._snackbar.open("aprendamos a cocinar!", '', {duration: 2000, panelClass: ['aac-green']});
    this.logInChange.emit($event);
    setTimeout(function(){ location.reload(); }, 1200);
  }

  openModal(content:any) {
    this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
    console.log("USERUSERUSER: ");
    console.log(this.userInfo);
	}

  logout(){
    this.apiService.logout().subscribe(result =>{
      this.userInfo = result;
      this.loggedIn = false;
      localStorage.setItem("recipeHistory", '[]');
      this._snackbar.open("sesión ha sido cerrada", '', {duration: 2500, panelClass: ['aac-red']});
      console.log("HISTORY:");
      console.log(localStorage.getItem("recipeHistory"));
      setTimeout(function(){ location.reload(); }, 1200);
    });
  }

}
