import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Recipe, Comment, User, Image } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:4200/api';
  private recipes$: Subject<Recipe[]> = new Subject();
  private user$: Subject<User> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshRecipes() {
    this.httpClient.get<Recipe[]>(`${this.url}/recipes`)
      .subscribe(recipes => {
        this.recipes$.next(recipes);
      });
  }

  //Recipe handlers
  getRecipes(): Subject<Recipe[]> {
    this.refreshRecipes();
    return this.recipes$;
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

  isLoggedIn():Observable<any>{
    this.refreshUser();
    return this.user$;
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




  // private refreshComments() {
  //   this.httpClient.get<Comment[]>(`${this.url}/comments`)
  //     .subscribe(comments => {
  //       this.comments$.next(comments);
  //     });
  // }

  // getComments(): Subject<Comment[]> {
  //   this.refreshComments();
  //   return this.comments$;
  // }

  // getComment(id: string): Observable<Comment> {
  //   return this.httpClient.get<Comment>(`${this.url}/comments/${id}`);
  // }

  // createComment(comment: Comment): Observable<string> {
  //   return this.httpClient.post(`${this.url}/comments`, comment, { responseType: 'text' });
  // }

  // updateComment(id: string, comment: Comment): Observable<string> {
  //   return this.httpClient.put(`${this.url}/comments/${id}`, comment, { responseType: 'text' });
  // }

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
