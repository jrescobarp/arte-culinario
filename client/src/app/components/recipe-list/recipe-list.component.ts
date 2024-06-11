import { Component, OnInit, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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
  userInfo: User;
  searchInputTxt = "";

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
    console.log("EVENT: ");
    console.log(event);
    console.log(event.target.value);
    this.searchInputTxt = event.target.value;
    this.searchResultRecipes = [];
    if(this.searchInputTxt){
      this.allRecipes.forEach((recipe:any) => {
        if(recipe.name.includes(this.searchInputTxt.toUpperCase())){
          console.log("RECIPEP: ");
          console.log(recipe.name);
          this.searchResultRecipes.push(recipe);
        }
        // searchResultRecipes
      });
    }
  }

}
