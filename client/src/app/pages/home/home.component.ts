import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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
  recipes$: any = [];
  isMobile = false;
  featuredMeals: any[] = [];
  appsArr : any[]= [];
  entreeArr : any[]= [];
  dessertArr: any[]= [];
  defaultFeaturedMealArr: any[] = [];

 constructor(private apiService: ApiService, private _snackbar: MatSnackBar,private cdRef: ChangeDetectorRef, private ngZone: NgZone) { }

  async ngOnInit() {

    const recipes = await this.apiService.getRecipes();
    this.recipes$ = recipes;

    if(!localStorage.getItem("appsArr") || !localStorage.getItem("entreeArr") || !localStorage.getItem("dessertArr")){
      this.createLocalStorageArrays();
    }

    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };
  }

  createLocalStorageArrays(){
    this.recipes$.forEach((r:any) => {
      if(r.type[0] === "entremeses y bocas" || r.type[0] === "ensaladas" || r.type[0] === "huevos" || r.type[0] === "caldos y sopas" || r.type[0] === "platos ligeros"){
        this.appsArr.push(r);
      }
      if(r.type[0] === "pasteles" || r.type[0] === "dulces caseros" || r.type[0] === "postres livianos" || r.type[0] === "cakes" || r.type[0] === "dulces"){
        this.dessertArr.push(r);
      }
      if(r.type[0] === "carne de res" || r.type[0] === "comida tipica" || r.type[0] === "carne de cerdo" || r.type[0] === "pavos" || r.type[0] === "aves" || r.type[0] === "pastas" || r.type[0] === "arroces" || r.type[0] === "pescados y mariscos"){
        this.entreeArr.push(r);
      }
    });
    localStorage.setItem("appsArr", JSON.stringify(this.appsArr));
    localStorage.setItem("dessertArr", JSON.stringify(this.dessertArr));
    localStorage.setItem("entreeArr", JSON.stringify(this.entreeArr));
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
