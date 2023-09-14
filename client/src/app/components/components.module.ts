import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCollapseModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { FeaturedMealComponent } from './featured-meal/featured-meal.component';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    ViewRecipeComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
  ],
  exports:[
    RecipeListComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent
  ]
})
export class ComponentsModule { }
