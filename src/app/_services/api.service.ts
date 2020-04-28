import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Group } from '_models/group.model';
import { Account } from '_models/account.model';

import { emptyish } from '_helpers/emptyish';
import { Post } from '_models/post.model';



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

  getCurrentAccount() {
      return this.httpClient.get<any>(`${this.apiUrl}/accounts`);
  }

  createAccount() {
    return this.httpClient.post<any>(`${this.apiUrl}/accounts`, '');
  }

  patchAccount(id, account: Account) {
    return this.httpClient.patch<any>(`${this.apiUrl}/accounts/${id}`, account);
  }

  getAccountProperties() {
    return this.httpClient.get<any>(`${this.apiUrl}/accounts/properties`);
  }


  /*
  * Group Methods
  */

  getGroups() {
    return this.httpClient.get<any>(`${this.apiUrl}/groups`);
  }

  getGroup(groupId) {
    return this.httpClient.get<any>(`${this.apiUrl}/groups/${groupId}`);
  }

  createGroup(group) {
    return this.httpClient.post<any>(`${this.apiUrl}/groups`, group);
  }


  /*
  * Post Methods
  */

  getPosts(options = {}) {
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
    return this.httpClient.get<any>(`${this.apiUrl}/posts`, {
      params: params,
    });
  }

  getPost(postId) {
    return this.httpClient.get<any>(`${this.apiUrl}/posts/${postId}`);
  }

  getGroupPosts(groupId) {
    return this.httpClient.get<any>(`${this.apiUrl}/groups/${groupId}/posts`);
  }

  createPost(post: Post, groupId: any) {
    return this.httpClient.post<Post>(`${this.apiUrl}/groups/${groupId}/posts`, post);
  }

  /*
  * Comment Methods
  */

  getComments(options = {}) {
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
    return this.httpClient.get<any>(`${this.apiUrl}/comments`, {
      params: params,
    });
  }

  getComment(commentId) {
    return this.httpClient.get<any>(`${this.apiUrl}/comments/${commentId}`);
  }

  getPostComments(postId) {
    return this.httpClient.get<any>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  createComment(postId, comment) {
     return this.httpClient.post<any>(`${this.apiUrl}/posts/${postId}/comment`, comment);
  }
}
