import { Injectable } from "@angular/core";
import "nativescript-localstorage";

@Injectable({
  providedIn: "root",
})
export class BackendService {

  static isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  static get token(): string {
    return String(localStorage.getItem("token"));
  }
  
  static set token(theToken: string) {
    localStorage.setItem("token", theToken);
  }
}
