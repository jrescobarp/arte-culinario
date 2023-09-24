import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models'
import { ApiService } from '../../api.service'
import { BehaviorSubject } from 'rxjs';

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
  });
  isMobile = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    if(window.innerWidth <= 1000){
      this.isMobile = true;
    };

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.apiService.getRecipe(id !).subscribe((recipe) => {
      this.recipe.next(recipe);
      // this.recipe = recipe;
      console.log("RECIPEE: ", this.recipe.value);
    });

  }
}
