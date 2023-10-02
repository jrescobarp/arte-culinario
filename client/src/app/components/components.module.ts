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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FeaturedMealComponent } from './featured-meal/featured-meal.component';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    RecipeListComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
