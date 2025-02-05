import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models'
import { ApiService } from '../../api.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models'
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {
  recipe: BehaviorSubject<Recipe> = new BehaviorSubject<Recipe>({
    _id: '',
    name:'',
    description: '',
    portions: '',
    steps: [],
    verbs: [],
    ingredients: [],
    type: [],
    connected_recipes: [],
    comments: [],
    featured_meal_count:0,
    book: [],
    images:[]
  });
  isMobile = false;
  user$: any;
  userInfo : any;
  isFavorite = false;
  connectedRecipe: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private _snackbar: MatSnackBar,
    private modalService: NgbModal,
  ) { }

  async ngOnInit() {
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
    // console.log("getuser");
    // this.userInfo = await this.apiService.isLoggedIn();
    // console.log("gotuser");

    this.apiService.getRecipe(id !).subscribe((recipe) => {
      this.recipe.next(recipe);
      if(recipe.connected_recipes.length){
        this.connectedRecipe = recipe.connected_recipes;
      }
      // this.checkFavorites();
      console.log("RECIPEEE:", recipe);
    });

    this.userInfo = await this.apiService.isLoggedIn();
    this.checkFavorites();

  }

  copyToClipboard(type:string){
    let copyTxt = "";
    if(type === "all"){
      copyTxt += this.recipe.value.name + "\n\n";
    }
    if(type === "ingredients" || type === "all"){
      this.recipe.value.ingredients.forEach((element, index) => {
        copyTxt += element + (index < (this.recipe.value.ingredients.length - 1) ? "\n" : "");
      });
      copyTxt += "\n\n";
    }
    if(type === "steps" || type === "all"){
      this.recipe.value.steps.forEach((element, index) => {
        copyTxt += (index + 1) + ". "+ element + (index < (this.recipe.value.steps.length - 1) ? "\n" : "");
      });
      copyTxt += "\n\n";
    }
    navigator.clipboard.writeText(copyTxt);
  }

  checkFavorites(){
    this.userInfo.recipes.forEach((element:any) => {
      if(element._id === this.recipe.value._id){
        this.isFavorite = true;
      }
    });
  }

  addRecipeToFavorites(){
    this.checkFavorites();
    if(!this.isFavorite){
      this.userInfo.recipes.push(this.recipe.value!);
      this.apiService.updateUser(this.userInfo._id!, this.userInfo).subscribe((userInfo:any)=>{
        this._snackbar.open(this.recipe.value.name + " ha sido agregada a tu lista de favoritos", '', {duration: 2500, panelClass: ['aac-green']});
        this.isFavorite = true;
      });
    }else{
      this._snackbar.open("Ya esta la receta en tu lista de favoritos", '', {duration: 2500, panelClass: ['aac-red']});
    }
  }

  removeRecipeFromFavorites(){
    this.userInfo.recipes.forEach((element:any, index:any) => {
      if(element._id === this.recipe.value._id){
        this.userInfo.recipes.splice(index, 1);
      }
    });
    this.apiService.updateUser(this.userInfo._id!, this.userInfo).subscribe((userInfo:any)=>{
      this.isFavorite = false;
      this._snackbar.open(this.recipe.value.name + " ha sido borrado de tu lista de favoritos", '', {duration: 2500, panelClass: ['aac-red']});
    });
  }

  open(content:any, createType:string, editImgIndex: number = -1) {
    if(this.userInfo){
      this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {}, (reason) => {});
    }else{
      this._snackbar.open("inicia sesión o crea una cuenta para subir fotos", '', {duration: 2500, panelClass: ['aac-red']});
    }
	}

  recheckFavorites($event:any){
    this.userInfo = JSON.parse($event);
    this.checkFavorites();
  }
}
