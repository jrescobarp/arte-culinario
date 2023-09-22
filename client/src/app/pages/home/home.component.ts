import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, User } from '../../models';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes$: Observable<Recipe[]> = new Observable();
  user$: Observable<User[]> = new Observable();
  isMobile = false;

 constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchRecipes();
    this.fetchUser();
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };
  }

  private fetchRecipes(): void {
    this.recipes$ = this.apiService.getRecipes();

  }

  fetchUser(): void {
    this.user$ = this.apiService.isLoggedIn();
  }
}
