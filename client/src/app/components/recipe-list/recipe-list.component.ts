import { Component, OnInit, Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
  @Input() isMobile!: boolean;
  @Input() recipes: any;
  categoryObj = {
    name : "",
    recipes: []
  };
  categoryList: any[] = [];

  ngOnInit(): void {
    this.createOptionsList();
  }


  async createOptionsList(){
    this.recipes.subscribe((recipe:any) => {
      recipe.forEach((r:any) => {
        r.type.forEach((e:any) => {
          if(this.categoryList.length){
            let found = false;
            this.categoryList.forEach((orgRec:any) => {
              if(orgRec.name === e){
                orgRec.recipes.push(r);
                found = true;
              }
            });
            if(!found){
              this.categoryList.push({
                name: e,
                recipes: [r]
              });
            }
          }else{
            this.categoryList.push({
              name: e,
              recipes: [r]
            });
          }
      });
    });
    });
  }

  public log(data: any, pre: any = false) {
    let prefix = data;
    if (pre) {
        data = pre;
    } else {
        prefix = 'log';
    }
    if (typeof data === 'object' && data !== null) {
        data = JSON.parse(JSON.stringify(data));
    }
    console.log(prefix + ':', data);
}

}
