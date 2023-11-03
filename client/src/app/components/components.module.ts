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
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { FeaturedMealComponent } from './featured-meal/featured-meal.component';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { ImageDisplayComponent } from './image-display/image-display.component';



@NgModule({
  declarations: [
    RecipeListComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent,
    NavbarComponent,
    FooterComponent,
    CommentsSectionComponent,
    ImageDisplayComponent
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
    FormsModule,
    MatTooltipModule
  ],
  exports:[
    RecipeListComponent,
    FeaturedMealComponent,
    LoginComponent,
    UserMenuComponent,
    NavbarComponent,
    FooterComponent,
    CommentsSectionComponent,
    ImageDisplayComponent
  ]
})
export class ComponentsModule { }
