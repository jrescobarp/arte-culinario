import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() recName: string;
  @Input() path: string;
  @Input() user: any;
  @Input() showProfileDropdown: boolean = false;
  isMobile = false;

  ngOnInit(): void {
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };
    console.log("navbarUser");
    console.log(this.user);
  }

  ngOnChanges(){
    console.log("navbarUserChange");
    console.log(this.user);
  }

  hover(imgName:string) {
    var el = document.getElementById("navUserIcon");
    el!.setAttribute('src', '../../../assets/'+imgName);
  }

}
