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
  private recipes$: any = [];
  private user$: any;
  private comments$: Subject<Comment[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  //Recipe handlers
  async getRecipes() {
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
  async isLoggedIn(){
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
}
