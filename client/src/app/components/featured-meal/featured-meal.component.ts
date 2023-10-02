import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featured-meal',
  templateUrl: './featured-meal.component.html',
  styleUrls: ['./featured-meal.component.scss']
})
export class FeaturedMealComponent implements OnInit {
  @Input() featuredRecipe: any[];
  @Input() isMobile!: boolean;
  imgEx = ["https://www.allrecipes.com/thmb/uAwSabBR2F1Nt88E2z6tFUFuPuw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5061638-93061a303c0047b68e1d2ef3ed113952.jpg", "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440", "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"]
  showImg = "";

  ngOnInit(): void {
    console.log("RECEIVED RECIPES: ", this.featuredRecipe);
    let randImg = Date.now() % this.imgEx.length;
    this.showImg = this.imgEx[randImg];
  }

  viewRecipe(id:string){
    window.location.href = `/recipe/${id}`;
  }
}
