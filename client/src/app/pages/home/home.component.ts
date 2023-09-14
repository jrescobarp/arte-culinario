import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../models';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes$: Observable<Recipe[]> = new Observable();
  isMobile = false;

 constructor(private ApiService: ApiService) { }

  ngOnInit(): void {
    this.fetchEmployees();
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    }
  }

  private fetchEmployees(): void {
    this.recipes$ = this.ApiService.getRecipes();
  }
}
