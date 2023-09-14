import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-meal',
  templateUrl: './featured-meal.component.html',
  styleUrls: ['./featured-meal.component.scss']
})
export class FeaturedMealComponent {
  exampleIngred = [{quantity:'1/4 cup', name:'parsley'}, {quantity:'1/2 table spoon', name:'salt'}, {quantity:'1/2 lb', name:'chicken breast'}, {quantity:'1 pinch', name:'pepper'},{quantity:'1/4 cup', name:'parsley'}, {quantity:'1/2 table spoon', name:'salt'}, {quantity:'1/2 lb', name:'chicken breast'}, {quantity:'1 pinch', name:'pepper'},{quantity:'1/4 cup', name:'parsley'}, {quantity:'1/2 table spoon', name:'salt'}, {quantity:'1/2 lb', name:'chicken breast'}, {quantity:'1 pinch', name:'pepper'},{quantity:'1/4 cup', name:'parsley'}, {quantity:'1/2 table spoon', name:'salt'}, {quantity:'1/2 lb', name:'chicken breast'}, {quantity:'1 pinch', name:'pepper'},{quantity:'1/4 cup', name:'parsley'}, {quantity:'1/2 table spoon', name:'salt'}, {quantity:'1/2 lb', name:'chicken breast'}, {quantity:'1 pinch', name:'pepper'}];
  exampleSteps = [{verb:'cut', duration:'', text: 'carrots juliene style'}, {verb:'mix', duration:'30 seconds', text: 'spices together'}, {verb:'soak', duration:'1hrs', text:'chicken in oil for'}, {verb:'fry', duration:'20 minutes', text: 'all ingredients together'},{verb:'cut', duration:'', text: 'carrots juliene style'}, {verb:'mix', duration:'30 seconds', text: 'spices together'}, {verb:'soak', duration:'1hrs', text:'chicken in oil for'}, {verb:'fry', duration:'20 minutes', text: 'all ingredients together'},{verb:'cut', duration:'', text: 'carrots juliene style'}, {verb:'mix', duration:'30 seconds', text: 'spices together'}, {verb:'soak', duration:'1hrs', text:'chicken in oil for'}, {verb:'fry', duration:'20 minutes', text: 'all ingredients together'},{verb:'cut', duration:'', text: 'carrots juliene style'}, {verb:'mix', duration:'30 seconds', text: 'spices together'}, {verb:'soak', duration:'1hrs', text:'chicken in oil for'}, {verb:'fry', duration:'20 minutes', text: 'all ingredients together'},{verb:'cut', duration:'', text: 'carrots juliene style'}, {verb:'mix', duration:'30 seconds', text: 'spices together'}, {verb:'soak', duration:'1hrs', text:'chicken in oil for'}, {verb:'fry', duration:'20 minutes', text: 'all ingredients together'}];

  @Input() isMobile!: boolean;
}
