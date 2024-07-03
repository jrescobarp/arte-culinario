import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../api.service'
import { User } from '../../models'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent{
  @Input() isMobile!: boolean;
  @Input() recipes: any;
  @Input() user: any;
  categoryObj = {
    name : "",
    recipes: []
  };
  categoryList: any[] = [];
  favoritesList: any[] = [];
  allRecipes: any[] = [];
  searchResultRecipes: any[] = [];
  recipeHistory: any[] = [];
  userInfo: User;
  searchInputTxt = "";

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnChanges(){
    // await this.checkUser();
    if(!this.userInfo){
      this.userInfo = this.user;
      console.log("FAVEREC323232: ");
      this.userInfo ? this.favoritesList = this.userInfo.recipes : '';
      console.log(this.favoritesList);
    }
    if(!this.categoryList.length){
      this.createOptionsList();
    }
  }

  async createOptionsList(){
      this.recipes.forEach((r:any) => {
        // this.allRecipes.push(r);
        r.type.forEach((type:any) => {
          if(this.categoryList.length){
            let found = this.categoryList.find(e => e.name === type);
            if(found){
              found.recipes.push(r);
            }
            if(!found){
              this.categoryList.push({
                name: type,
                recipes: [r]
              });
            }
          }else{
            this.categoryList.push({
              name: type,
              recipes: [r]
            });
          }
        });
      });
      console.log("FOUND:");
      console.log(this.categoryList);
  }

  showHideSearchResults(displayTxt:string){
    document.getElementById("first")!.style.display = displayTxt;
  }

  onKeyUpSearch(event:any){
    this.searchInputTxt = event.target.value;
    this.searchResultRecipes = [];
    if(this.searchInputTxt){
      this.recipes.forEach((recipe:any) => {
        if(recipe.name.includes(this.searchInputTxt.toUpperCase())){
          this.searchResultRecipes.push(recipe);
        }
      });
    }
  }

  recipeRedirect(recipe : any){
    if(this.userInfo){
      this.recipeHistory = localStorage.getItem("recipeHistory") ? JSON.parse(localStorage.getItem("recipeHistory")!) : [];
      const foundDuplicateIndex = this.recipeHistory.findIndex(e => e._id === recipe._id);
      if (foundDuplicateIndex > -1) {
        this.recipeHistory.splice(foundDuplicateIndex, 1);
      }
      if(this.recipeHistory.length === 30){
        this.recipeHistory.splice(0, 1);
      }
      this.recipeHistory.push(recipe);
      this.userInfo.recipe_history = this.recipeHistory;
      localStorage.setItem("recipeHistory", JSON.stringify(this.recipeHistory));
      this.apiService.updateUser(this.userInfo._id!, this.userInfo).subscribe((user) => {});
      window.location.href = "/recipe/" + recipe._id;
    }else{
      window.location.href = "/recipe/" + recipe._id;
    }
  }

}
