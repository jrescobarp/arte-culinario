import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap, lastValueFrom } from 'rxjs';
import { Recipe, Comment, User, Image } from './models';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:4200/api';
  // private recipes$: Subject<Recipe[]> = new Subject();
  private recipes$: any = [];
  private user$: any;
  private comments$: Subject<Comment[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshRecipes() {
    return this.httpClient.get(`${this.url}/recipes`);
    // return new Promise<void>((resolve, reject) => {
    //   this.httpClient.get<Recipe[]>(`${this.url}/recipes`)
    //     .subscribe(recipes => {
    //       console.log("INTERNALREC: ");
    //       console.log(recipes);
    //       this.recipes$ = recipes;
    //       resolve();
    //       // this.recipes$.next(recipes);
    //     });
    // });
  }

  //Recipe handlers
  async getRecipes() {
    // await this.refreshRecipes().then(function(name) {
    //   console.log("3453435354343:");
    //   console.log(name)
    // });
    // this.recipes$ = this.refreshRecipes();
    return await lastValueFrom(this.httpClient.get(`${this.url}/recipes`));
  }

  getRecipe(id: string) {
    return this.httpClient.get<Recipe>(`${this.url}/recipes/${id}`);
  }

  createRecipe(recipe: Recipe): Observable<string> {
    return this.httpClient.post(`${this.url}/recipes`, recipe, { responseType: 'text' });
  }

  updateRecipe(id: string, recipe: Recipe): Observable<string> {
    return this.httpClient.put(`${this.url}/recipes/${id}`, recipe, { responseType: 'text' });
  }

  deleteRecipe(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/recipes/${id}`, { responseType: 'text' });
  }



  //User handlers
  private refreshUser() {
    this.httpClient.get<User>(`${this.url}/user`)
      .subscribe(user => {
        this.user$.next(user);
      });
  }

  async isLoggedIn(){
    // this.refreshUser();
    // return this.user$;
    return await lastValueFrom(this.httpClient.get(`${this.url}/user`));
  }

  registerUser(user:User): Observable<any>{
    return this.httpClient.post(`${this.url}/user/register`, user, {responseType: 'text'});
  }

  login(user:User): Observable<any>{
    return this.httpClient.post(`${this.url}/user/login`, user, {responseType: 'text'});
  }

  logout():Observable<any>{
    return this.httpClient.get(`${this.url}/user/logout`);
  }

  updateUser(id: string, user: User): Observable<any> {
    return this.httpClient.put(`${this.url}/user/${id}`, user, { responseType: 'text' });
  }


  //Comment Handllers
  getComments(id: string): Observable<any>{
    return this.httpClient.get(`${this.url}/comments/${id}`);
  }

  createComment(comment: Comment): Observable<string> {
    return this.httpClient.post(`${this.url}/comments`, comment, { responseType: 'text' });
  }

  updateComment(id: string, comment: Comment): Observable<string> {
    return this.httpClient.put(`${this.url}/comments/${id}`, comment, { responseType: 'text' });
  }

  //Image Handlers
  createImage(image: any): Observable<any> {
    return this.httpClient.post(`${this.url}/image`, image, {responseType: 'text'});
  }

  editImage(id: string, image: any): Observable<any> {
    return this.httpClient.put(`${this.url}/image/${id}`, image, {responseType: 'text'});
  }

  upvoteImg(id:string, image:any): Observable<any> {
    return this.httpClient.put(`${this.url}/image/upvotes/${id}`, image, {responseType: 'text'});
  }

  deleteImage(id: string, image: any): Observable<any> {
    const httpOptions = {
      body: image
    };
    return this.httpClient.delete(`${this.url}/image/${id}`, httpOptions);
  }

  // deleteComment(id: string): Observable<string> {
  //   return this.httpClient.delete(`${this.url}/comments/${id}`, { responseType: 'text' });
  // }

  // private refreshUsers() {
  //   this.httpClient.get<User[]>(`${this.url}/user`)
  //     .subscribe(user => {
  //       this.user$.next(user);
  //     });
  // }

  // getUsers(): Subject<User[]> {
  //   this.refreshUsers();
  //   return this.user$;
  // }

  // getUser(id: string): Observable<User> {
  //   return this.httpClient.get<User>(`${this.url}/user/${id}`);
  // }

  // createUser(user: User): Observable<string> {
  //   return this.httpClient.post(`${this.url}/user`, user, { responseType: 'text' });
  // }

  // updateUser(id: string, user: User): Observable<string> {
  //   return this.httpClient.put(`${this.url}/user/${id}`, user, { responseType: 'text' });
  // }

  // deleteUser(id: string): Observable<string> {
  //   return this.httpClient.delete(`${this.url}/user/${id}`, { responseType: 'text' });
  // }

  // private refreshImages() {
  //   this.httpClient.get<Image[]>(`${this.url}/images`)
  //     .subscribe(images => {
  //       this.images$.next(images);
  //     });
  // }

  // getImages(): Subject<Image[]> {
  //   this.refreshImages();
  //   return this.images$;
  // }

  // getImage(id: string): Observable<Image> {
  //   return this.httpClient.get<Image>(`${this.url}/images/${id}`);
  // }

  // createImage(image: Image): Observable<string> {
  //   return this.httpClient.post(`${this.url}/images`, image, { responseType: 'text' });
  // }

  // updateImage(id: string, image: Image): Observable<string> {
  //   return this.httpClient.put(`${this.url}/images/${id}`, image, { responseType: 'text' });
  // }

  // deleteImage(id: string): Observable<string> {
  //   return this.httpClient.delete(`${this.url}/images/${id}`, { responseType: 'text' });
  // }
}
