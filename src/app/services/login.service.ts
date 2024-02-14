import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const baseUrl = 'http://localhost:8080/user';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(loginData: any) {
    console.log("posting data")
    return this.http.post(`${baseUrl}/login`, loginData);
  }

  /**
   * Storing token in local storage
   */
  public storeToken(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  public getCurrentUser() {

    console.log(this.http.get(`${baseUrl}/currentUser`))
    return this.http.get(`${baseUrl}/currentUser`);
  }

  //isLogin: user is logged in or not

  public isLoggedIn(): boolean {
    let tokenStr = localStorage.getItem("token");
    return !(tokenStr == undefined || tokenStr == '' || tokenStr == null);
  }

  // logout: remove token from the localstorage
  public logout(): boolean {
    localStorage.removeItem("token");
    return true;
  }

  // return token
  public getToken() {
    return localStorage.getItem("token");
  }

  public setUser(user: any) {
    localStorage.setItem(
      'user', JSON.stringify(user)
    );
    return true;
  }
}
