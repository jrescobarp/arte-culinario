import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-meal',
  templateUrl: './featured-meal.component.html',
  styleUrls: ['./featured-meal.component.scss']
})
export class FeaturedMealComponent implements OnInit {
  @Input() featuredRecipe: any[];
  @Input() isMobile!: boolean;
  @Input() isHomePage: boolean;


  ngOnInit(): void {}

  viewRecipe(id:string){
    window.location.href = `/recipe/${id}`;
  }
}
