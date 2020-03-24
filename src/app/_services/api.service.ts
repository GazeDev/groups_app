import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Property } from '_models/property.model';
import { Landlord } from '_models/landlord.model';
// import { Group } from '_models/group.model';
import { emptyish } from '_helpers/emptyish';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public apiUrl:string;

  constructor(
    private httpClient: HttpClient
  ) {

  }

  setUrl(url:string) {
    this.apiUrl = url;
  }

  getUrl() {
    return this.apiUrl;
  }


  /*
  * Backend Status
  */

  checkStatus() {
    return this.httpClient.get<any>(`${this.apiUrl}/`);
  }


  /*
  * Account Methods
  */

  getAccount(observeResponse: boolean = false) {
    if (observeResponse) {
      return this.httpClient.get<any>(`${this.apiUrl}/accounts`, {observe: 'response'});
    } else {
      return this.httpClient.get<any>(`${this.apiUrl}/accounts`);
    }

  }

  createAccount() {
    return this.httpClient.post<any>(`${this.apiUrl}/accounts`, '');
  }

  getAccountLandlords() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/landlords`);
  }

  getAccountProperties() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/properties`);
  }

  getAccountReviews() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/reviews`);
  }


  /*
  * Group Methods
  */

  getGroups(options ={}) {
    let params = {};
    for (var key in options) {
      if (
        emptyish(options[key])
        || options[key] == undefined
      ) {
        continue;
      }
      params[key] = options[key];
    }
    return this.httpClient.get<any>(`${this.apiUrl}/groups`, {
      params: params,
    });
  }

  getGroups(groupId) {
    return this.httpClient.get<any>(`${this.apiUrl}/groups/${groupId}`);
  }

  createGroup() {
    return this.httpClient.post<any>(`${this.apiUrl}/groups`, '');
  }


  /*
  * Post Methods
  */

  getPost(postId) {
    return this.httpClient.get<any>(`${this.apiUrl}/posts/${postId}`);
  }

  createPost(groupId) {
     return this.httpClient.post<any>(`${this.apiUrl}/groups/${groupId}/posts`, '');
  }


  /*
  * Comment Methods
  */

  getComments() {
    return this.httpClient.get<any>(`${this.apiUrl}/comments`);
  }

  getComments(commentId) {
    return this.httpClient.get<any>(`${this.apiUrl}/comments/${commentId}`);
  }

  createComment(postId) {
     return this.httpClient.post<any>(`${this.apiUrl}/posts/${postId}/comment`, '');
  }
}
