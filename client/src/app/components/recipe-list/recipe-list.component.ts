import { Component, OnInit, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from '../../api.service'
import { User } from '../../models'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
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

  async ngOnInit(){
    await this.checkUser();
    this.createOptionsList();
  }

  checkUser(){
    return new Promise((resolve, reject) => {
      this.user.subscribe((userInfo:any) => {
        if(userInfo){
          this.userInfo = userInfo;
        }
      });
      resolve(true);
    });
    // this.user.subscribe((userInfo:any) => {
    //   if(userInfo){
    //     this.userInfo = userInfo;
    //   }
    // });
  }

  async createOptionsList(){
    this.recipes.subscribe((recipe:any) => {
      recipe.forEach((r:any) => {
        this.allRecipes.push(r);
        r.type.forEach((e:any) => {
          if(this.categoryList.length){
            let found = false;
            this.categoryList.forEach((orgRec:any) => {
              if(orgRec.name === e){
                orgRec.recipes.push(r);
                found = true;
              }
            });
            if(!found){
              this.categoryList.push({
                name: e,
                recipes: [r]
              });
            }
          }else{
            this.categoryList.push({
              name: e,
              recipes: [r]
            });
          }
        });
        if(this.userInfo){
          this.userInfo.recipes.forEach(element => {
            if(element === r._id){
              this.favoritesList.push(r);
            }
          });
        }
    });
    });
  }

  showHideSearchResults(displayTxt:string){
    document.getElementById("first")!.style.display = displayTxt;
  }

  onKeyUpSearch(event:any){
    this.searchInputTxt = event.target.value;
    this.searchResultRecipes = [];
    if(this.searchInputTxt){
      this.allRecipes.forEach((recipe:any) => {
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
