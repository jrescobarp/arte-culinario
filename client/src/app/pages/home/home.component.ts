import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, User } from '../../models';
import { ApiService } from '../../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipes$: Observable<Recipe[]> = new Observable();
  user$: Observable<User[]> = new Observable();
  isMobile = false;
  featuredMeals: any[] = [];

 constructor(private apiService: ApiService, private _snackbar: MatSnackBar) { }

  async ngOnInit() {
    this.fetchRecipes();
    this.fetchUser();
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };
    // if(!localStorage.getItem("appsArr")){
    //   this.createLocalStorageArrays();
    // }
    // this.createFeaturedMealArray();
    this.createLocalStorageArrays();
  }

  private fetchRecipes(): void {
    this.recipes$ = this.apiService.getRecipes();
  }

  fetchUser(): void {
    this.user$ = this.apiService.isLoggedIn();
  }

  createLocalStorageArrays(){
    let appsArr : any[]= [];
    let entreeArr : any[]= [];
    let dessertArr: any[]= [];
    this.recipes$.subscribe((recipe:any) => {
      console.log("RECIPEIPEIPEIEIPEI: ", recipe);
      recipe.forEach((r:any) => {
        if(r.type[0] === "entremeses y bocas"){
          appsArr.push({
            id: r._id,
            featuredCount : 0
          });
        }
      });
      localStorage.setItem("appsArr", JSON.stringify(appsArr));
    });
    this.createFeaturedMealArray();
  }

  async createFeaturedMealArray(){

    this.apiService.getRecipe("646d64dc7cf61a3d4d0df229").subscribe((recipe:any) =>{
      this.featuredMeals.push(recipe);
      localStorage.setItem("featuredMealArr",JSON.stringify(this.featuredMeals));
    });

    // let featuredMealSetTime = Number(localStorage.getItem("featuredMealSetTime"));
    // // 86400000ms = 24hrs
    // // if(featuredMealSetTime && (Date.now() > Number(featuredMealSetTime + 86400000))){
    // if(featuredMealSetTime && (Date.now() > Number(featuredMealSetTime + 20000))){
    //   let appetizers = JSON.parse(localStorage.getItem("appsArr") || "[]");
    //   // let entrees = JSON.parse(localStorage.getItem("entreeArr") || "[]");
    //   // let desserts = JSON.parse(localStorage.getItem("dessertArr") || "[]");

    //   // this.apiService.getRecipe(this.findLowestFeaturedCount(appetizers,"appsArr")).subscribe((recipe:any) =>{
    //   this.apiService.getRecipe("646d64dc7cf61a3d4d0df229").subscribe((recipe:any) =>{

    //     this.featuredMeals.push(recipe);
    //     localStorage.setItem("featuredMealArr",JSON.stringify(this.featuredMeals));
    //   });

    //   localStorage.setItem("featuredMealSetTime",Date.now().toString());
    // }else{
    //   this.featuredMeals = JSON.parse(localStorage.getItem("featuredMealArr") || "[]");
    // }
  }

  findLowestFeaturedCount(arr:any, type:string){
    let fCount = 100000000;
    let lowestCountElement;
    for(const element of arr) {
      if(!element.featuredCount){
        element.featuredCount++;
        localStorage.setItem(type,JSON.stringify(arr));
        return element.id;
      }else if(element.featuredCount < fCount){
        lowestCountElement = element;
        fCount = element.featuredCount;
      }
    };
    lowestCountElement.featuredCount++;
    localStorage.setItem(type,JSON.stringify(arr));
    return lowestCountElement.id;
  }

}
