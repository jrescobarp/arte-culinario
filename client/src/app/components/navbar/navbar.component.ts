import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() path: string;
  @Input() user: any;
  isMobile = false;

  ngOnInit(): void {
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };
  }
}
