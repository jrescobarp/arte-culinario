import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-featured-meal',
  templateUrl: './featured-meal.component.html',
  styleUrls: ['./featured-meal.component.scss']
})
export class FeaturedMealComponent implements OnInit {
  @Input() featuredRecipeArr: any[];
  @Input() isMobile!: boolean;
  @Input() isHomePage: boolean;
  recipeImg = [];
  featuredMeals : any;
  randNumArr: number [] = [];
 constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      // let randNum = Math.floor((Math.random() * recipe.images.length));
      this.featuredMeals = JSON.parse(localStorage.getItem("featuredMealArr")!);
      // console.log("LSRECIPE: ", JSON.parse(localStorage.getItem("appsArr")!));
      // this.pickRandPic();
      // console.log("LSRECIPE22: ", this.randNumArr);
  }

  randNumGenerator(num:number, index:number){
    if(!this.randNumArr[index]){
      this.randNumArr[index] = Math.floor((Math.random() * num));
    }
    return this.randNumArr[index];
  }

  // pickRandPic(){
  //   this.featuredMeals.forEach((meal:any) => {
  //     console.log("MEAL: ", meal);
  //     let url = '';
  //     if(meal.images.length){
  //       this.randNumArr = Math.floor((Math.random() * meal.images.length));
  //     }
  //   });
  // }

  viewRecipe(id:string){
    window.location.href = `/recipe/${id}`;
  }
}
